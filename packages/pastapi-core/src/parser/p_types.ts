import { Route } from "./rp_types";
import { Schema } from "./sp_types";

export interface SyntaxTree {
  routes: Route[];
  schemas: Schema[];
}
