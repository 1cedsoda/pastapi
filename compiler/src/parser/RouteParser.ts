import fs from "fs";
import { load } from "js-yaml";
import * as ct from "../collector/types";
import * as rpt from "./rp_types";

export class RouteParser {
  collectedRoutes: Record<string, ct.Route> = {};

  constructor(collectorResult: ct.CollectorResult) {
    this.collectedRoutes = collectorResult.routes;
  }

  parse(): rpt.Route[] {
    return this.parseAllRoutes(1);
  }

  private parseAllRoutes(depth: number): rpt.Route[] {
    console.log("  ".repeat(depth) + `parseAllRoutes`);
    const routes: rpt.Route[] = [];
    Object.keys(this.collectedRoutes).forEach((key, i) => {
      let object = this.collectedRoutes[key];
      routes.push(this.parseRoute(key, object, depth + 1));
    });
    return routes;
  }

  private parseRoute(key: string, object: any, depth: number): rpt.Route {
    console.log("  ".repeat(depth) + `parseRoute: ${key}`);

    const defaultMethod = {
      params: undefined,
      body: undefined,
      query: undefined,
      headers: "*",
    };

    if (!object.route) throw new Error("route must be defined");

    if (typeof object.route !== "string")
      throw new Error("route must be a string");
    object.get =
      object.get === undefined
        ? { ...defaultMethod }
        : this.parseMethod("GET", object.get, depth + 1);
    object.post =
      object.post === undefined
        ? { ...defaultMethod }
        : this.parseMethod("POST", object.post, depth + 1);
    object.put =
      object.put === undefined
        ? { ...defaultMethod }
        : this.parseMethod("PUT", object.put, depth + 1);
    object.delete =
      object.delete === undefined
        ? { ...defaultMethod }
        : this.parseMethod("DELETE", object.delete, depth + 1);

    return {
      name: key,
      route: object.route,
      get: object.get,
      post: object.post,
      put: object.put,
      delete: object.delete,
    };
  }

  private parseMethod(
    methodKey: string,
    method: any,
    depth: number
  ): rpt.Method {
    console.log("  ".repeat(depth) + `parseMethod: ${methodKey}`);

    if (!method.params) method.path = undefined;
    if (!method.body) method.body = undefined;
    if (!method.query) method.query = undefined;
    if (!method.headers) method.headers = "*";

    if (typeof method.params !== "string" && method.params !== undefined)
      throw new Error("params must be a string");
    if (typeof method.body !== "string" && method.body !== undefined)
      throw new Error("body must be a string");
    if (typeof method.query !== "string" && method.query !== undefined)
      throw new Error("query must be a string");
    if (typeof method.headers !== "string" && method.headers !== undefined)
      throw new Error("headers must be a string");

    return {
      params: method.params,
      body: method.body,
      query: method.query,
      headers: method.headers,
    };
  }
}
