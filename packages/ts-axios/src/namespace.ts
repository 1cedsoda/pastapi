import { Operation } from "pastapi-core";
import { camelCase, fuck, toZod } from "./helpers";

export const operationNamespaces = (ast: Operation[]) => `
${ast.map(operationNamespace).join("\n")}`;

const operationNamespace = (o: Operation) => {
  return `export namespace ${fuck(o.operationId)} {
    export const bodySchemas = {
       ${o.requestBodies.map((rb) => `"${rb.applicationType}" : ${toZod(rb.bodySchema)}`)}
     }
    export type Body =
      ${
        o.requestBodies.length > 0
          ? o.requestBodies
              .map(
                (rb) =>
                  `{ ${o.requestBodies.length > 1 ? `applicationType: "${rb.applicationType}",` : ``}
                   body: z.infer<typeof bodySchemas["${rb.applicationType}"]> }`
              )
              .join(` | `)
          : `{}`
      }

      export const paramSchemas = {
       ${o.requestParameters.map((p) => `${camelCase(p.name)} : ${toZod(p.schema)}${p.required ? "" : ".optional()"}`)}
     }
    export type FetchVariables = Body & {
      ${o.requestParameters.map((p) => camelCase(p.name) + `: z.infer<typeof paramSchemas["${camelCase(p.name)}"]>`)}
    }

    export const fetch = async ({${[
      ...o.requestParameters.map((p) => camelCase(p.name)),
      ...(o.requestBodies.length > 0 ? [`body`] : []),
      ...(o.requestBodies.length > 1 ? [`applicationType`] : []),
    ].join(",")}}: FetchVariables, config?: AxiosRequestConfig) => axios({
      url: \`${o.path.replace(/{/g, "${")}\`,
      headers: {
        ${[
          ...o.requestParameters
            .filter((p) => p.in == "header")
            .map((p) => `"${p.name.toLowerCase()}": ${camelCase(p.name)}`),
          ...(o.requestBodies.length > 0
            ? [
                `"Content-Type": ${
                  o.requestBodies.length > 1 ? `applicationType` : `"${o.requestBodies[0].applicationType}"`
                }`,
              ]
            : []),
        ].join(",")}
      },
      params: {
        ${o.requestParameters
          .filter((p) => p.in == "query")
          .map((p) => `"${p.name}": ${camelCase(p.name)}`)
          .join(",")}
      },
      ${o.requestBodies.length > 0 ? `data: body,` : ``}
      ...config
    })
  }
  `;
};
