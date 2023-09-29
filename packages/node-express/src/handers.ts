import { Operation } from "pastapi-core";
import { fuck } from "./helpers";

export const handlerType = (ast: Operation[]) => `
export type PastapiHandlers = {
${ast.map(handlerTypeHandler).join("\n")}
}`;

const handlerTypeHandler = (o: Operation) =>
  `  ${o.operationId}?: ${fuck(o.operationId)}.Handler | undefined`;
