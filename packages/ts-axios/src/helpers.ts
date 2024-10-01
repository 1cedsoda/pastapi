import { parseSchema } from "json-schema-to-zod";
import { Operation, OperationResponse } from "pastapi-core";

// fist uppercase key
export function fuck(a: string): string {
  return a.charAt(0).toUpperCase() + a.slice(1);
}

// includes
export function includes<T>(arr: T[], item: T): boolean {
  return arr.indexOf(item) !== -1;
}

// /{id} -> /:id with regex
export function expressPath(path: string): string {
  return path.replace(/{(.*?)}/g, ":$1");
}

export const toZod = (schema: any) => parseSchema(prepareJsonForZod(schema));

// remove key "example" and description recusively
const prepareJsonForZod = (schema: any) => {
  if (schema?.example) {
    delete schema.example;
  }
  if (schema?.description) {
    delete schema.description;
  }
  if (schema?.properties) {
    Object.keys(schema.properties).forEach((key) => {
      prepareJsonForZod(schema.properties[key]);
    });
  }
  if (schema?.items) {
    prepareJsonForZod(schema.items);
  }
  return schema;
};

// concatIfNotEmpty
export function concatIfNotEmpty<T>(arr: T[], item: T): T[] {
  return arr.length > 0 ? arr.concat(item) : arr;
}

export function camelCase(_s: string): string {
  // deep clone string
  let s = cloneString(_s);
  // replace * with Any
  s = s.replace(/\*/g, "any");
  // remove all non alphanumeric characters and capitalize letters after them
  s = s.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  // lowercase first character
  s = s.charAt(0).toLowerCase() + s.substring(1);
  return s;
}

export function cloneString(s: string): string {
  return (" " + s).slice(1);
}

export function statusCodeRegex(statusCode: string): RegExp {
  // replace all X with \d
  const regex = statusCode.replace(/X/g, "\\d");
  return new RegExp(`^${regex}$`);
}

export function groupResponsesByStatusCode(responses: OperationResponse[]): [string, OperationResponse[]][] {
  const groups: { [key: string]: OperationResponse[] } = {};
  responses.forEach((res) => {
    if (!groups[res.statusCode]) {
      groups[res.statusCode] = [];
    }
    groups[res.statusCode].push(res);
  });
  return Object.entries(groups);
}
