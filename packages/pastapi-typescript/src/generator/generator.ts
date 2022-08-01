import { Generator } from "pastapi/src/generator/types";
import { SyntaxTree } from "pastapi/src/parser/p_types";

class PastapiTypescriptGenerator implements Generator {
  name: string = "typescript";
  dependsOn: string[] = [];
  generate(syntaxTree: SyntaxTree): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
