import { SyntaxTree } from "../parser/p_types";

export interface Generator {
  name: string;
  dependsOn: string[];
  generate(syntaxTree: SyntaxTree): Promise<void>;
}
