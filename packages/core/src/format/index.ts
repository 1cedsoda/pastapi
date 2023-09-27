import * as prettier from "prettier";

export const format = (code: string) =>
  prettier.format(code, { parser: "typescript" });
