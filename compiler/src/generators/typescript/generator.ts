import { SyntaxTree } from "../../parser/p_types";
import { Generator } from "../types";

export class TypescriptGenerator implements Generator {
  target: string = "typescript";
  async generate(syntaxTree: SyntaxTree): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
