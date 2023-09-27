import { parseSchema } from "json-schema-to-zod";
import { Operation } from "@pastapi/core";
import { fuc, includes } from "../helpers";

const supportedContentTypes = [
  "application/json",
  "application/x-www-form-urlencoded",
];

export const generatePaths = (ops: Operation[]): string => `
import { Request, Response, Router } from "express";
import { z } from "zod";
${buildTypes(ops)}
${buildInterface(ops)}
${buildMiddleware(ops)}`;

const buildTypes = (ast: Operation[]) => `
${ast.map(buildOperationTypes).join("\n")}`;

const buildInterface = (ast: Operation[]) => `
export type PastapiHandlers = {
${ast.map(buildMethod).join("\n")}
}`;

const buildMethod = (o: Operation) =>
  `  ${o.operationId}: ${fuc(o.operationId)}.Handler | undefined`;

const buildMiddleware = (ast: Operation[]) => `
export function createPastapiRouter(handlers: PastapiHandlers): Router {
  const router = Router();
  ${ast.map(buildRoute).join("\n")}
  return router;
}`;

const buildRoute = (o: Operation) => `
  if (handlers?.${o.operationId}) {
    router.${o.method}("${o.path}", ${buildHandler(o)});
  }
  `;

const buildOperationTypes = (o: Operation) => {
  const requestBodies = o.requestBodies.filter((rb) =>
    includes(supportedContentTypes, rb.applicationType)
  );
  return `
export namespace ${fuc(o.operationId)} {
  export const bodySchemas = {
    ${requestBodies.map(
      (rb) => `"${rb.applicationType}" : ${buildZodSchema(rb.bodySchema)}`
    )}
  }
  export type ParsedBody = {
    ${requestBodies.map(
      (rb) =>
        `"${rb.applicationType}" : z.infer<typeof bodySchemas["${rb.applicationType}"]> | undefined`
    )}
  }
  export type ParsedContentType = keyof ParsedBody
  export const parameterSchemas = {
    ${o.requestParameters.map(
      (p) => `"${p.name}" : ${buildZodSchema(p.schema)}`
    )}
  }
  export type ParsedParameters = {
    ${o.requestParameters.map(
      (p) =>
        `"${p.name}" : z.infer<typeof parameterSchemas["${p.name}"]> | undefined`
    )}
  }
  export type Parsed = {
    bodyContentType: ParsedContentType | undefined,
    body: ParsedBody
    parameters: ParsedParameters
  }
  export type Handler = (req: Request, res: Response, parsed: Parsed) => Promise<void>

  export const parse = (req: Request): Parsed => {
    const parsed: Parsed = {
      bodyContentType: undefined,
      body: {
        ${o.requestBodies
          .filter((rb) => includes(supportedContentTypes, rb.applicationType))
          .map((rb) => `"${rb.applicationType}" : undefined`)
          .join(",\n")}
      },
      parameters: {
        ${o.requestParameters.map((p) => `"${p.name}" : undefined`).join(",\n")}
      }
    }
    
    ${
      requestBodies.length > 0
        ? `
        // parse body
        const contentType = req.headers["content-type"];
        if (contentType && contentType in Object.keys(parsed.body)) {
        const parsedContentType = contentType as ParsedContentType
        parsed.bodyContentType = parsedContentType;
        parsed.body[parsedContentType] = bodySchemas[parsedContentType]?.parse(req.body);
      }
    `
        : ""
    }

    ${o.requestParameters
      .filter((p) => p.in == "path")
      .map(
        (p) => `// parse ${p.name}
        const ${p.name}Param = req.params["${p.name}"];
        ${
          p.required
            ? `if (${p.name}Param === undefined) throw new Error("missing ${p.name}");`
            : ""
        }
        parsed.parameters["${p.name}"] = parameterSchemas["${p.name}"]?.parse(${
          p.name
        }Param);`
      )
      .join("\n")}
    
      return parsed;
  }
}`;
};

const buildHandler = (o: Operation) =>
  `async (req: Request, res: Response) => {
    const parsed = ${fuc(o.operationId)}.parse(req);
    handlers.${o.operationId}!(req, res, parsed);
  }`;

const buildZodSchema = (schema: any) => {
  const cleanedSchema = cleanupSchema(schema);
  return parseSchema(cleanedSchema);
};

// remove key "example" and description recusively
const cleanupSchema = (schema: any) => {
  if (schema.example) {
    delete schema.example;
  }
  if (schema.description) {
    delete schema.description;
  }
  if (schema.properties) {
    Object.keys(schema.properties).forEach((key) => {
      cleanupSchema(schema.properties[key]);
    });
  }
  if (schema.items) {
    cleanupSchema(schema.items);
  }
  return schema;
};
