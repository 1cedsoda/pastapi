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

    export const responseSchemasOk = [
      ${o.responses
        .filter((res) => res.statusCode.startsWith("2"))
        .map(
          (res) => `{
          statusCode: "${res.statusCode}",
          contentType: "${res.applicationType}",
          bodySchema: ${toZod(res.bodySchema)},
          headerSchema: ${toZod(res.headerSchema)}
        }`
        )}
    ]

    export const responseSchemasError = [
      ${o.responses
        .filter((res) => !res.statusCode.startsWith("2"))
        .map(
          (res) => `{
          statusCode: "${res.statusCode}",
          contentType: "${res.applicationType}",
          bodySchema: ${toZod(res.bodySchema)},
          headerSchema: ${toZod(res.headerSchema)}
        }`
        )}
    ]

    export const responseSchemas = [
      ...responseSchemasOk,
      ...responseSchemasError
    ]
  
    export type ResponseBodyOk = z.infer<(typeof responseSchemasOk[number]["bodySchema"])>
    export type ResponseBodyError = z.infer<(typeof responseSchemasError[number]["bodySchema"])>
    export type ResponseBody = z.infer<(typeof responseSchemas[number]["bodySchema"])>

    export const requestParamSchemas = {
       ${o.requestParameters.map((p) => `${camelCase(p.name)} : ${toZod(p.schema)}${p.required ? "" : ".optional()"}`)}
    }

    export type Variables = RequestBody & OptionalUndefined<{
      ${o.requestParameters.map(
        (p) => camelCase(p.name) + `: z.infer<typeof requestParamSchemas["${camelCase(p.name)}"]>`
      )}
    }>

    export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(axiosInstance: AxiosInstance, vars: Variables, config?: AxiosRequestConfig<${
      o.requestBodies.length > 0 ? `Pick<RequestBody, "body">` : `undefined`
    }>) => axiosInstance.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "${o.method}",
      url: \`${o.path.replace(/{/g, "${vars.")}\`,
      headers: {
        ${[
          ...o.requestParameters
            .filter((p) => p.in == "header")
            .map(
              (p) =>
                `"${p.name}": requestParamSchemas["${camelCase(p.name)}"].parse(vars.${camelCase(
                  p.name
                )}, { path: ["request", "${camelCase(p.name)}"] })`
            ),
          ...(o.requestBodies.length > 0 ? [`"Content-Type": "${o.requestBodies[0].applicationType}"`] : []),
        ].join(",")}
      },
      params: {
        ${o.requestParameters
          .filter((p) => p.in == "query")
          .map(
            (p) =>
              `"${p.name}": requestParamSchemas["${camelCase(p.name)}"].parse(vars.${camelCase(
                p.name
              )}, { path: ["request", "${camelCase(p.name)}"] })`
          )
          .join(",")}
      },
      ${
        o.requestBodies.length > 0
          ? `data: requestBodySchemas[vars.contentType].parse(vars.body, { path: ["request", "body"] }),`
          : ``
      }
      ...config
    })

    export type AxiosConfig = AxiosRequestConfig<${
      o.requestBodies.length > 0 ? `Pick<RequestBody, "body">` : `undefined`
    }>

    export const requestSafe = async <REQ_B = RequestBody, RES_B_OK = ResponseBodyOk, RES_B_ERROR = ResponseBodyError>(axiosInstance: AxiosInstance, vars: Variables, config?: AxiosConfig) => safeifyRequest<REQ_B, RES_B_OK, RES_B_ERROR>(axiosInstance, vars, config, request)
  }
  `;
};
