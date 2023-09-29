import { Operation } from "pastapi-core";
import { expressPath, fuck } from "./helpers";

export const router = (ast: Operation[]) => `
export function createRouter(handlers: PastapiHandlers): Router {
  const router = Router();
  ${ast.map(route).join("\n")}
  return router;
}`;

const route = (o: Operation) => `
    router.${o.method}("${expressPath(o.path)}", ${fuck(
      o.operationId
    )}.createRouter(handlers.${o.operationId}));
  `;
