import { SyntaxTree } from "../parser/p_types";

export interface GeneratorInfo {
  name: string;
  dependsOn: string[];
}

export interface Generator {
  target: string;
  generate(syntaxTree: SyntaxTree): Promise<void>;
}
