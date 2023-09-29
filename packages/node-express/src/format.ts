import * as prettier from "prettier";

export const format = (code: string, config?: prettier.Options | undefined) =>
  prettier.format(code, { parser: "typescript", ...config });
