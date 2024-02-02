import { Operation } from "pastapi-core";
import { camelCase, fuck, toZod } from "./helpers";

export const operationNamespaces = (ast: Operation[]) => `
${ast.map(operationNamespace).join("\n")}`;

const operationNamespace = (o: Operation) => {
  return `export namespace ${fuck(o.operationId)} {
    export const requestBodySchemas = {
       ${o.requestBodies.map((rb) => `"${rb.applicationType}" : ${toZod(rb.bodySchema)}`)}
     }
    export type RequestBody =
      ${
        o.requestBodies.length > 0
          ? o.requestBodies
              .map(
                (rb) =>
                  `{ contentType: "${rb.applicationType}", body: z.infer<typeof requestBodySchemas["${rb.applicationType}"]> }`
              )
              .join(` | `)
          : `{}`
      }

    export const responseSchemas = [
      ${o.responses.map(
        (res) => `{
          statusCode: "${res.statusCode}",
          contentType: "${res.applicationType}",
          bodySchema: ${toZod(res.bodySchema)},
          headerSchema: ${toZod(res.headerSchema)}
        }`
      )}
    ]
  
    export type ResponseBody = z.infer<(typeof responseSchemas[number]["bodySchema"])>

    export const requestParamSchemas = {
       ${o.requestParameters.map((p) => `${camelCase(p.name)} : ${toZod(p.schema)}${p.required ? "" : ".optional()"}`)}
    }

    export type Variables = RequestBody & {
      ${o.requestParameters.map(
        (p) => camelCase(p.name) + `: z.infer<typeof requestParamSchemas["${camelCase(p.name)}"]>`
      )}
    }

    export const request = async (axios: AxiosInstance, vars: Variables, config?: AxiosRequestConfig<${
      o.requestBodies.length > 0 ? `Pick<RequestBody, "body">` : `undefined`
    }>) => axios.request<RequestBody, AxiosResponse<ResponseBody, RequestBody>>({
      method: "${o.method}",
      url: \`${o.path.replace(/{/g, "${vars.")}\`,
      headers: {
        ${[
          ...o.requestParameters
            .filter((p) => p.in == "header")
            .map((p) => `"${p.name}": requestParamSchemas["${camelCase(p.name)}"].parse(vars.${camelCase(p.name)})`),
          ...(o.requestBodies.length > 0 ? [`"Content-Type": "${o.requestBodies[0].applicationType}"`] : []),
        ].join(",")}
      },
      params: {
        ${o.requestParameters
          .filter((p) => p.in == "query")
          .map((p) => `"${p.name}": requestParamSchemas["${camelCase(p.name)}"].parse(vars.${camelCase(p.name)})`)
          .join(",")}
      },
      ${o.requestBodies.length > 0 ? `data: requestBodySchemas[vars.contentType].parse(vars.body),` : ``}
      ...config
    })
  }
  `;
};
