/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
/   
*/

import { z } from "zod";
import axios, { AxiosRequestConfig, Axios } from "axios";

export namespace GetUser {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "application/json",
      bodySchema: z.object({ id: z.number().int(), name: z.string() }),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "get",
      url: `/user`,
      headers: {},
      params: {},

      ...config,
    });
}

export namespace PostUser {
  export const requestBodySchemas = {
    "application/json": z.object({ id: z.number().int(), name: z.string() }),
  };
  export type RequestBody = {
    applicationType: "application/json";
    body: z.infer<(typeof requestBodySchemas)["application/json"]>;
  };

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<Pick<RequestBody, "body">>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "post",
      url: `/user`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
      data: requestBodySchemas[vars.applicationType].parse(vars.body),
      ...config,
    });
}

export namespace GetUserId {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "application/json",
      bodySchema: z.object({ id: z.number().int(), name: z.string() }),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {
    id: z.number().int(),
  };

  export type Variables = RequestBody & {
    id: z.infer<(typeof requestParamSchemas)["id"]>;
  };

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "get",
      url: `/user/${vars.id}`,
      headers: {},
      params: {},

      ...config,
    });
}

export namespace GetCookie {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {
    myRequiredCookie: z.number(),
    myOptionalCookie: z.string().optional(),
  };

  export type Variables = RequestBody & {
    myRequiredCookie: z.infer<(typeof requestParamSchemas)["myRequiredCookie"]>;
    myOptionalCookie: z.infer<(typeof requestParamSchemas)["myOptionalCookie"]>;
  };

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "get",
      url: `/cookie`,
      headers: {},
      params: {},

      ...config,
    });
}

export namespace GetHeader {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

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

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
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
    });
}

export namespace GetQuery {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "200",
      applicationType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {
    a: z.number(),
    b: z.string().optional(),
  };

  export type Variables = RequestBody & {
    a: z.infer<(typeof requestParamSchemas)["a"]>;
    b: z.infer<(typeof requestParamSchemas)["b"]>;
  };

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "get",
      url: `/query`,
      headers: {},
      params: {
        a: requestParamSchemas["a"].parse(vars.a),
        b: requestParamSchemas["b"].parse(vars.b),
      },

      ...config,
    });
}

export namespace GetError {
  export const requestBodySchemas = {};
  export type RequestBody = {};

  export const responseSchemas = [
    {
      statusCode: "500",
      applicationType: "text/plain",
      bodySchema: z.string(),
      headerSchema: z.never(),
    },
  ];

  export type ResponseBody = z.infer<
    (typeof responseSchemas)[number]["bodySchema"]
  >;

  export const requestParamSchemas = {};

  export type Variables = RequestBody & {};

  export const request = async (
    axios: Axios,
    vars: Variables,
    config?: AxiosRequestConfig<undefined>,
  ) =>
    axios.request<RequestBody, ResponseBody>({
      method: "get",
      url: `/error`,
      headers: {},
      params: {},

      ...config,
    });
}

export class Client {
  public axiosInstance: Axios;
  constructor(axiosInstance?: Axios) {
    this.axiosInstance = axiosInstance ?? axios.create();
  }

  public async getUser(
    variables: GetUser.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUser.request(this.axiosInstance, variables, config);
  }

  public async postUser(
    variables: PostUser.Variables,
    config?: AxiosRequestConfig<Pick<PostUser.RequestBody, "body">>,
  ) {
    return PostUser.request(this.axiosInstance, variables, config);
  }

  public async getUserId(
    variables: GetUserId.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetUserId.request(this.axiosInstance, variables, config);
  }

  public async getCookie(
    variables: GetCookie.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetCookie.request(this.axiosInstance, variables, config);
  }

  public async getHeader(
    variables: GetHeader.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetHeader.request(this.axiosInstance, variables, config);
  }

  public async getQuery(
    variables: GetQuery.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetQuery.request(this.axiosInstance, variables, config);
  }

  public async getError(
    variables: GetError.Variables,
    config?: AxiosRequestConfig<undefined>,
  ) {
    return GetError.request(this.axiosInstance, variables, config);
  }
}
