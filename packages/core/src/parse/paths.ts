import { OpenAPI } from "openapi-types";
import {
  Operation,
  OperationResponse,
  RequestBody,
  RequestParameter,
} from "./pathsTypes";

export function parseOperations(spec: OpenAPI.Document): Operation[] {
  const operations: Operation[] = [];

  for (const path in spec.paths) {
    for (const method of [
      "get",
      "put",
      "post",
      "delete",
      "options",
      "head",
      "patch",
    ]) {
      let operation;
      switch (method) {
        case "get":
          operation = spec.paths[path]!.get;
          break;
        case "put":
          operation = spec.paths[path]!.put;
          break;
        case "post":
          operation = spec.paths[path]!.post;
          break;
        case "delete":
          operation = spec.paths[path]!.delete;
          break;
        case "options":
          operation = spec.paths[path]!.options;
          break;
        case "head":
          operation = spec.paths[path]!.head;
          break;
        case "patch":
          operation = spec.paths[path]!.patch;
          break;
      }
      if (!operation) {
        continue;
      }
      const operationId =
        operation.operationId ?? generateOperationId(method, path);
      const responses = parseResponses(operation);
      const requestBodies = parseRequestBodies(operation);
      const requestParameters = parseRequestParameters(operation);
      operations.push({
        path,
        method,
        operationId,
        responses,
        requestBodies,
        requestParameters,
      });
    }
  }

  return operations;
}

function parseResponses(operation: any): OperationResponse[] {
  const responses: any = [];

  for (const statusCode in operation.responses) {
    const response = operation.responses[statusCode];
    const headerSchema = response.headers;

    for (const applicationType in response.content) {
      const bodySchema = response.content[applicationType].schema;
      responses.push({
        statusCode,
        applicationType,
        bodySchema,
        headerSchema: undefined,
      });
    }
  }

  return responses;
}

function parseRequestBodies(operation: any): RequestBody[] {
  if (!operation.requestBody) {
    return [];
  }
  const requestBodies: RequestBody[] = [];

  for (const applicationType in operation.requestBody.content) {
    const bodySchema = operation.requestBody.content[applicationType].schema;
    requestBodies.push({
      applicationType,
      bodySchema,
    });
  }

  return requestBodies;
}

function parseRequestParameters(operation: any): RequestParameter[] {
  const requestParameters: RequestParameter[] = [];

  for (const parameterKey in operation.parameters) {
    const parameter = operation.parameters[parameterKey];
    const { name } = parameter;
    const inLocation = parameter.in;
    const { schema } = parameter;
    const { required } = parameter;
    requestParameters.push({
      name,
      in: inLocation,
      schema,
      required,
    });
  }

  return requestParameters;
}

function generateOperationId(mehtod: string, path: string): string {
  const cleanPath = path.replace(/[^a-zA-Z0-9\/]/g, "");
  const splitPath = cleanPath.split("/");
  return `${mehtod}${splitPath
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("")}`;
}
