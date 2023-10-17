import { Operation, RequestParameter } from "pastapi-core";
import { camelCase, fuck, toZod } from "./helpers";

export const operationNamespaces = (ast: Operation[]) => `
${ast.map(operationNamespace).join("\n")}`;

const operationNamespace = (o: Operation) => {
  return `
export namespace ${fuck(o.operationId)} {
  export const bodySchemas = {
    ${o.requestBodies.map((rb) => `"${rb.applicationType}" : ${toZod(rb.bodySchema)}`)}
  }
  export type ParsedBody = {
    ${o.requestBodies.map(
      (rb) => `"${rb.applicationType}" : z.infer<typeof bodySchemas["${rb.applicationType}"]> | undefined`
    )}
  }
  ${
    o.requestBodies.length > 0
      ? `export const parsedContentTypeSchema = z.enum([${o.requestBodies
          .map((rb) => `"${rb.applicationType}"`)
          .join(",\n")}])`
      : `;`
  }
  export const paramSchemas = {
    ${o.requestParameters.map((p) => `${camelCase(p.name)} : ${toZod(p.schema)}${p.required ? "" : ".optional()"}`)}
  }
  export type ParamsParsed = {
    ${o.requestParameters.map((p) => `${camelCase(p.name)} : z.infer<typeof paramSchemas["${camelCase(p.name)}"]>`)}
  }
  export type Parsed = {
    contentType: ${o.requestBodies.length > 0 ? "keyof ParsedBody" : "undefined"},
    body: ParsedBody
    params: ParamsParsed
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
        ? `const contentType = parsedContentTypeSchema.parse(req.headers["content-type"], { path: ["header", "Content-Type"] });`
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
    params: {
      ${o.requestParameters
        .map(
          (p) => `
      "${camelCase(p.name)}": paramSchemas.${camelCase(p.name)}?.parse(${readParameter(p)}, { path: ["${p.in}", "${
        p.name
      }"] })
      `
        )
        .join(",\n")}
    }
  };

  return parsed;
  }`;

const readParameter = (p: RequestParameter) => {
  if (p.in === "path") {
    return `autoCastString(paramSchemas.${camelCase(p.name)}, req.params["${p.name}"])`;
  }
  if (p.in === "query") {
    return `autoCastQuery(paramSchemas.${camelCase(p.name)}, req.query["${p.name}"])`;
  }
  if (p.in === "header") {
    return `autoCastString(paramSchemas.${camelCase(p.name)}, single(req.headers["${p.name.toLowerCase()}"]))`;
  }
  if (p.in === "cookie") {
    return `autoCastString(paramSchemas.${camelCase(p.name)}, req.cookies["${p.name}"])`;
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
      next();
    });
    return router;
}
`;
