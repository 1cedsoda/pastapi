import { Operation } from "pastapi-core";
import { format } from "@prettier/sync";
import { Options } from "prettier";
import { operationNamespaces } from "./namespace";
import { apiClass } from "./class";

export const generate = (ops: Operation[], prettierConfig?: Options | undefined): string => {
  const code = generateRaw(ops);
  return format(code, { parser: "typescript", ...prettierConfig });
};

export const generateRaw = (ops: Operation[]): string => `${buildHeader()}

import { z } from "zod";
import axios, { AxiosRequestConfig, Axios } from "axios";

${operationNamespaces(ops)}
${apiClass(ops)}
`;

const buildHeader = () => `
/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
/   
*/`;
