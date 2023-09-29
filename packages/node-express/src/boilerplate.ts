export const boilerplate = () => `
${zodPreprocessors()}
${singleFunction()}
${keysIncludeFunction()}
`;

const zodPreprocessors = () => `
export function tryAutoCastString(
  schema: z.ZodTypeAny,
  value: string | undefined
): any | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (schema instanceof z.ZodNumber) {
    if (schema._def.checks.map((c) => c.kind).includes("int")) {
      const casted = parseInt(value);
      return !isNaN(casted) ? casted : undefined;
    } else {
      const casted = parseFloat(value);
      return !isNaN(casted) ? casted : undefined;
    }
  } else if ((schema as any) instanceof z.ZodBoolean) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      return undefined;
    }
  }
}

export function autoCastString(schema: z.ZodTypeAny, value: string | undefined): any {
  return tryAutoCastString(schema, value) ?? value;
}

export function autoCastQuery(schema: z.ZodTypeAny, value: any): any {
  if (typeof value === "string") {
    return autoCastString(schema, value);
  }
  return value as any;
}
`;

const singleFunction = () => `
export function single<T>(input: T | T[]): T {
  return Array.isArray(input) ? input[0] : input;
}
`;

const keysIncludeFunction = () => `
export function keysInclude<T extends object>(obj: T, key: keyof any): key is keyof T {
  return Object.keys(obj).indexOf(key as string) !== -1;
}
`;
