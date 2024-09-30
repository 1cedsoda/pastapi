import { Operation } from "pastapi-core";
import { camelCase, fuck, groupResponsesByStatusCode, statusCodeRegex, toZod } from "./helpers";

export const operationNamespaces = (ast: Operation[]) => `
${ast.map(operationNamespace).join("\n")}`;

const operationNamespace = (o: Operation) => {
  return `export namespace ${fuck(o.operationId)} {
    export const requestBodySchemas = {
      ${o.requestBodies.map((rb) => `"${rb.applicationType}" : ${toZod(rb.bodySchema)}`)}
    }

    export type RequestBody = ${
      o.requestBodies.length > 0
        ? o.requestBodies
            .map(
              (rb) =>
                `{ contentType: "${rb.applicationType}", body: z.infer<typeof requestBodySchemas["${rb.applicationType}"]> }`
            )
            .join(` | `)
        : `{}`
    }

    ${groupResponsesByStatusCode(o.responses)
      .map(
        ([statusCode, o]) =>
          `${o
            .map(
              (res) => `export const responseSchema${statusCode}${fuck(camelCase(res.applicationType))} = {
        contentType: "${res.applicationType}",
        bodySchema: ${toZod(res.bodySchema)},
        headerSchema: ${toZod(res.headerSchema)}
      }\n`
            )
            .join("\n")}

      export const responseSchemas${statusCode} = [
      ${o.map((res) => `responseSchema${statusCode}${fuck(camelCase(res.applicationType))}`).join(",\n")}
]`
      )
      .join("\n")}

    export const responseSchemas = [
        ${o.responses.map((res) => `...responseSchemas${res.statusCode}`).join(",\n")}
    ]
  
    ${groupResponsesByStatusCode(o.responses)
      .map(
        ([statusCode, o]) =>
          `${o
            .map(
              (res) =>
                `export type ResponseBody${statusCode}${fuck(
                  camelCase(res.applicationType)
                )} = z.infer<(typeof responseSchema${statusCode}${fuck(camelCase(res.applicationType))}["bodySchema"])>`
            )
            .join("\n")}

            export type ResponseBody${statusCode} = ${o
              .map((res) => `ResponseBody${statusCode}${fuck(camelCase(res.applicationType))}`)
              .join(" | ")}
      `
      )
      .join("\n")}

    export type ResponseBody = z.infer<(typeof responseSchemas[number]["bodySchema"])>

    export type ResponseBodySafe = {
      /** All responses */
      any: AxiosResponse<any, RequestBody>, 
      /** All responses with status code and content-type included in the OpenAPI spec */
      all: AxiosResponse<ResponseBody, RequestBody> | null, 
      ${groupResponsesByStatusCode(o.responses)
        .map(
          ([statusCode, o]) => `/** Any ${statusCode} response */
          any${statusCode}: AxiosResponse<any, RequestBody> | null,
          /** All ${statusCode} responses with content types included in the OpenAPI spec */
          all${statusCode}: AxiosResponse<ResponseBody${statusCode}, RequestBody> | null, 
        ${o
          .map(
            (res) => `/** ${statusCode} response with content-type ${res.applicationType} */
            ${camelCase(res.applicationType)}${statusCode}: AxiosResponse<ResponseBody${statusCode}${fuck(
              camelCase(res.applicationType)
            )}, RequestBody> | null,`
          )
          .join("")}
        /** All ${statusCode} responses with content types not included in the OpenAPI spec */
        other${statusCode}: AxiosResponse<any, RequestBody> | null,`
        )
        .join("")}
      /** If status isn't included in the OpenAPI spec */
      other: AxiosResponse<any, RequestBody> | null, 
    }

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

    export const requestSafe = async (axiosInstance: AxiosInstance, vars: Variables, config?: AxiosConfig): Promise<ResponseBodySafe> => {
      const res = await request(axiosInstance, vars, {
        ...config,
        validateStatus: () => true,
      });
      let safeRes: ResponseBodySafe = {
        any: res as AxiosResponse<any, RequestBody>,
        all: null,
        ${groupResponsesByStatusCode(o.responses)
          .map(
            ([statusCode, o]) => `any${statusCode}: null,
        all${statusCode}: null,
        ${o.map((res) => `${camelCase(res.applicationType)}${statusCode}: null,`).join("")}
        other${statusCode}: null,`
          )
          .join("")}
        other: null,
      }
        
      ${groupResponsesByStatusCode(o.responses)
        .map(
          ([statusCode, o]) =>
            `if (${statusCodeRegex(statusCode)}.test(res.status.toString())) {
              safeRes.any${statusCode} = res as unknown as AxiosResponse<RequestBody, any>
              ${o
                .map(
                  (res) =>
                    `if (res.headers["content-type"] == "${res.applicationType}") {
                  safeRes.${camelCase(
                    res.applicationType
                  )}${statusCode} = res as unknown as AxiosResponse<ResponseBody${statusCode}${fuck(
                    camelCase(res.applicationType)
                  )}, RequestBody>
                  safeRes.all${statusCode} = res as unknown as AxiosResponse<ResponseBody${statusCode}, RequestBody>
                  safeRes.all = res as unknown as AxiosResponse<ResponseBody, RequestBody>
                  }
                  `
                )
                .join(" else ")} 
                ${o.length > 0 ? ` else safeRes.other${statusCode} = res` : ""}
            }`
        )
        .join(" else ")}
        ${groupResponsesByStatusCode(o.responses).length > 0 ? ` else safeRes.other = res` : ""}
        return safeRes
    }
  }`;
};
