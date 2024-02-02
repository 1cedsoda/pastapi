/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
/   
*/

import { z } from "zod";
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

export namespace GetUser {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "application/json",
      bodySchema: z.object({ id: z.number().int(), name: z.string() }),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/user`,
      headers: {},
      params: {},

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace PostUser {
  export const requestBodySchemas = {
    "application/json": z.object({ id: z.number().int(), name: z.string() }),
  };
  export type RequestBody = {
    contentType: "application/json";
    body: z.infer<(typeof requestBodySchemas)["application/json"]>;
  };

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<Pick<RequestBody, "body">>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "post",
      url: `/user`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
      data: requestBodySchemas[vars.contentType].parse(vars.body),
      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<Pick<RequestBody, "body">>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace GetUserId {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "application/json",
      bodySchema: z.object({ id: z.number().int(), name: z.string() }),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {
    id: z.number().int(),
  };

  export type Variables = RequestBody & {
    id: z.infer<(typeof requestParamSchemas)["id"]>;
  };

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/user/${vars.id}`,
      headers: {},
      params: {},

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace GetCookie {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {
    myRequiredCookie: z.number(),
    myOptionalCookie: z.string().optional(),
  };

  export type Variables = RequestBody & {
    myRequiredCookie: z.infer<(typeof requestParamSchemas)["myRequiredCookie"]>;
    myOptionalCookie: z.infer<(typeof requestParamSchemas)["myOptionalCookie"]>;
  };

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/cookie`,
      headers: {},
      params: {},

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace GetHeader {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {
    xMyRequiredHeader: z.number(),
    xMyOptionalHeader: z.string().optional(),
  };

  export type Variables = RequestBody & {
    xMyRequiredHeader: z.infer<
      (typeof requestParamSchemas)["xMyRequiredHeader"]
    >;
    xMyOptionalHeader: z.infer<
      (typeof requestParamSchemas)["xMyOptionalHeader"]
    >;
  };

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/header`,
      headers: {
        "X-My-Required-Header": requestParamSchemas["xMyRequiredHeader"].parse(
          vars.xMyRequiredHeader,
        ),
        "X-My-Optional-Header": requestParamSchemas["xMyOptionalHeader"].parse(
          vars.xMyOptionalHeader,
        ),
      },
      params: {},

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace GetQuery {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [
    {
      statusCode: "200",
      contentType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemasError = [];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {
    a: z.number(),
    b: z.string().optional(),
  };

  export type Variables = RequestBody & {
    a: z.infer<(typeof requestParamSchemas)["a"]>;
    b: z.infer<(typeof requestParamSchemas)["b"]>;
  };

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/query`,
      headers: {},
      params: {
        a: requestParamSchemas["a"].parse(vars.a),
        b: requestParamSchemas["b"].parse(vars.b),
      },

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export namespace GetError {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemasOk = [];

  export const responseSchemasError = [
    {
      statusCode: "500",
      contentType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export const responseSchemas = [
    ...responseSchemasOk,
    ...responseSchemasError,
  ];

  export type ResponseBodyOk = z.infer<
    (typeof responseSchemasOk)[number]["bodySchema"]
  >;
  export type ResponseBodyError = z.infer<
    (typeof responseSchemasError)[number]["bodySchema"]
  >;
  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export type OkResponse<OK = ResponseBodyOk, ERROR = ResponseBodyError> = {
    successful: OK | null;
    unsuccessful: ERROR | null;
  };

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async <REQ_B = RequestBody, RES_B = ResponseBody>(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<REQ_B, AxiosResponse<RES_B, REQ_B>>({
      method: "get",
      url: `/error`,
      headers: {},
      params: {},

      ...config,
      validateStatus: () => true,
    });

  export const requestOk = async <
    REQ_B = RequestBody,
    RES_B_OK = ResponseBodyOk,
    RES_B_ERROR = ResponseBodyError,
  >(
    axios: AxiosInstance,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) => {
    const res = await request<REQ_B, RES_B_OK & RES_B_ERROR>(axios, vars, {
      ...config,
      validateStatus: (s) => s >= 200 && s < 300, // default
    });
    return res.config.validateStatus!(res.status) == true
      ? {
          ok: res as unknown as AxiosResponse<REQ_B, RES_B_OK>,
          error: null,
        }
      : {
          ok: null,
          error: res as unknown as AxiosResponse<REQ_B, RES_B_ERROR>,
        };
  };
}

export class Client {
  public axiosInstance: AxiosInstance;
  constructor(axiosInstance?: AxiosInstance) {
    this.axiosInstance = axiosInstance ?? axios.create();
  }

  public async getUser(
    variables: GetUser.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUser.request(this.axiosInstance, variables, config);
  }

  public async getUserOk(
    variables: GetUser.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUser.requestOk(this.axiosInstance, variables, config);
  }

  public async postUser(
    variables: Omit<PostUser.Variables, "contentType">,
    config?: AxiosRequestConfig<Pick<PostUser.RequestBody, "body">>,
  ) {
    return PostUser.request(
      this.axiosInstance,
      { contentType: "application/json", ...variables },
      config,
    );
  }

  public async postUserOk(
    variables: Omit<PostUser.Variables, "contentType">,
    config?: AxiosRequestConfig<Pick<PostUser.RequestBody, "body">>,
  ) {
    return PostUser.requestOk(
      this.axiosInstance,
      { contentType: "application/json", ...variables },
      config,
    );
  }

  public async getUserId(
    variables: GetUserId.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUserId.request(this.axiosInstance, variables, config);
  }

  public async getUserIdOk(
    variables: GetUserId.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUserId.requestOk(this.axiosInstance, variables, config);
  }

  public async getCookie(
    variables: GetCookie.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetCookie.request(this.axiosInstance, variables, config);
  }

  public async getCookieOk(
    variables: GetCookie.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetCookie.requestOk(this.axiosInstance, variables, config);
  }

  public async getHeader(
    variables: GetHeader.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetHeader.request(this.axiosInstance, variables, config);
  }

  public async getHeaderOk(
    variables: GetHeader.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetHeader.requestOk(this.axiosInstance, variables, config);
  }

  public async getQuery(
    variables: GetQuery.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetQuery.request(this.axiosInstance, variables, config);
  }

  public async getQueryOk(
    variables: GetQuery.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetQuery.requestOk(this.axiosInstance, variables, config);
  }

  public async getError(
    variables: GetError.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetError.request(this.axiosInstance, variables, config);
  }

  public async getErrorOk(
    variables: GetError.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetError.requestOk(this.axiosInstance, variables, config);
  }
}
