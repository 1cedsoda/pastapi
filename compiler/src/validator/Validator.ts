import * as pt from "../parser/p_types";

export class Validator {
  syntaxTree: pt.SyntaxTree;
  constructor(syntaxTree: pt.SyntaxTree) {
    this.syntaxTree = syntaxTree;
  }

  public validate(): void {
    console.log(`validate`);
    //TODO: implement
  }
}
