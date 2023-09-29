import { parseSchema } from "json-schema-to-zod";

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
  if (schema.example) {
    delete schema.example;
  }
  if (schema.description) {
    delete schema.description;
  }
  if (schema.properties) {
    Object.keys(schema.properties).forEach((key) => {
      prepareJsonForZod(schema.properties[key]);
    });
  }
  if (schema.items) {
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
  // remove all non alphanumeric characters and capitalize letters after them
  s = s.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  // lowercase first character
  s = s.charAt(0).toLowerCase() + s.substring(1);
  return s;
}

export function cloneString(s: string): string {
  return (" " + s).slice(1);
}
