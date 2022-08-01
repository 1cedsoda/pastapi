import { SyntaxTree } from "../parser/p_types";
import { Generator } from "./types";

export class GeneratorManager {
  names: string[];
  syntaxTree: SyntaxTree;
  generators: Generator[] = [];

  constructor(names: string[], syntaxTree: SyntaxTree) {
    this.names = this.getTargetChain(names);
    this.syntaxTree = syntaxTree;
  }

  public async compile(): Promise<void> {
    for (const name of this.names) {
      const generator = this.generators.find((g) => g.name === name);
      if (generator) {
        await generator.generate(this.syntaxTree);
      }
    }
  }

  private getTargetChain(names: string[]): string[] {
    const allTargets: string[] = [];
    for (const name of names) {
      allTargets.push(...this.resolveDependencies(name));
    }
    // remove duplicates
    const uniqueTargets: string[] = [];
    for (const name of allTargets) {
      if (!uniqueTargets.includes(name)) {
        uniqueTargets.push(name);
      }
    }
    return uniqueTargets;
  }

  private resolveDependencies(name: string): string[] {
    const dependencies = this.generators.filter((g) =>
      g.dependsOn.includes(name)
    );
    const result: string[] = [];
    for (const dependency of dependencies) {
      result.push(...this.resolveDependencies(dependency.name));
    }
    return result;
  }
}
