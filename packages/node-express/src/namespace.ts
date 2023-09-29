import { Operation, RequestParameter } from "pastapi-core";
import { camelCase, fuck, toZod } from "./helpers";

export const operationNamespaces = (ast: Operation[]) => `
${ast.map(operationNamespace).join("\n")}`;

const operationNamespace = (o: Operation) => {
  return `
export namespace ${fuck(o.operationId)} {
  export const bodySchemas = {
    ${o.requestBodies.map(
      (rb) => `"${rb.applicationType}" : ${toZod(rb.bodySchema)}`
    )}
  }
  export type ParsedBody = {
    ${o.requestBodies.map(
      (rb) =>
        `"${rb.applicationType}" : z.infer<typeof bodySchemas["${rb.applicationType}"]> | undefined`
    )}
  }
  export type ParsedContentType = keyof ParsedBody
  export const parameterSchemas = {
    ${o.requestParameters.map(
      (p) =>
        `${camelCase(p.name)} : ${toZod(p.schema)}${
          p.required ? "" : ".optional()"
        }`
    )}
  }
  export type ParsedParameters = {
    ${o.requestParameters.map(
      (p) =>
        `${camelCase(p.name)} : z.infer<typeof parameterSchemas["${camelCase(
          p.name
        )}"]>`
    )}
  }
  export type Parsed = {
    contentType: ${
      o.requestBodies.length > 0 ? "ParsedContentType" : "undefined"
    },
    body: ParsedBody
    parameters: ParsedParameters
  }
  export type Handler = (req: Request, res: Response, parsed: Parsed) => Promise<void>

  ${parseFunction(o)}
  ${createRouter(o)}
}`;
};

const parseFunction = (o: Operation) => `
export const parse = (req: Request): Parsed => {
    ${
      o.requestBodies.length > 0
        ? `z.string().parse(req.headers["Content-Type"], { path: ["header", "Content-Type"] });`
        : ``
    }
    ${
      o.requestBodies.length > 0
        ? `const contentType = single(req.headers["Content-Type"]) as ParsedContentType;`
        : `const contentType = undefined`
    }

  const parsed: Parsed = {
    contentType,
    body: {
      ${o.requestBodies
        .map(
          (rb) =>
            `"${rb.applicationType}" : contentType === "${rb.applicationType}" ? bodySchemas["${rb.applicationType}"]?.parse(req.body.data, { path: ["body"] }) : undefined`
        )
        .join(",\n")}
    },
    parameters: {
      ${o.requestParameters
        .map(
          (p) => `
      "${camelCase(p.name)}": parameterSchemas.${camelCase(
        p.name
      )}?.parse(${readParameter(p)}, { path: ["${p.in}", "${p.name}"] })
      `
        )
        .join(",\n")}
    }
  };

  return parsed;
  }`;

const readParameter = (p: RequestParameter) => {
  if (p.in === "path") {
    return `castStringForZod(parameterSchemas.${camelCase(
      p.name
    )}, req.params["${p.name}"])`;
  }
  if (p.in === "query") {
    return `castParsedQueryStringForZod(parameterSchemas.${camelCase(
      p.name
    )}, req.query["${p.name}"])`;
  }
  if (p.in === "header") {
    return `castStringForZod(parameterSchemas.${camelCase(
      p.name
    )}, single(req.headers["${p.name}"]))`;
  }
  if (p.in === "cookie") {
    return `castStringForZod(parameterSchemas.${camelCase(
      p.name
    )}, req.cookies["${p.name}"])`;
  }
};

const createRouter = (o: Operation) => `
export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      else res.status(501).send("Not Implemented");
      next();
    });
    return router;
}
`;
