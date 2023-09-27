export type Operation = {
  path: string;
  method: string;
  operationId: string;
  responses: OperationResponse[];
  requestBodies: RequestBody[];
  requestParameters: RequestParameter[];
};

export type OperationResponse = {
  statusCode: string;
  applicationType: string;
  bodySchema?: object;
  headerSchema?: object;
};

export type RequestBody = {
  applicationType: string;
  bodySchema?: object | undefined;
};

export type RequestParameter = {
  name: string;
  in: ParameterLocation;
  schema: object;
  required: boolean;
};

export type ParameterLocation = "path" | "query" | "header" | "cookie";
