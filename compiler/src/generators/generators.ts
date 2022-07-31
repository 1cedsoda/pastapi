import { SyntaxTree } from "../parser/p_types";
import { GeneratorInfo } from "./types";
import { TypescriptGenerator } from "./typescript/generator";
import { Generator } from "./types";

export const generatorInfos: GeneratorInfo[] = [
  {
    name: "typescript",
    dependsOn: [],
  },
];

export class GeneratorManager {
  targets: string[];
  syntaxTree: SyntaxTree;
  generators: Generator[] = [new TypescriptGenerator()];

  constructor(targets: string[], syntaxTree: SyntaxTree) {
    this.targets = this.getTargetChain(targets);
    this.syntaxTree = syntaxTree;
  }

  public async compile(): Promise<void> {
    for (const target of this.targets) {
      const generator = this.generators.find((g) => g.target === target);
      if (generator) {
        await generator.generate(this.syntaxTree);
      }
    }
  }

  private getTargetChain(targets: string[]): string[] {
    const allTargets: string[] = [];
    for (const target of targets) {
      allTargets.push(...this.resolveDependencies(target));
    }
    // remove duplicates
    const uniqueTargets: string[] = [];
    for (const target of allTargets) {
      if (!uniqueTargets.includes(target)) {
        uniqueTargets.push(target);
      }
    }
    return uniqueTargets;
  }

  private resolveDependencies(target: string): string[] {
    const dependencies = generatorInfos.filter((g) =>
      g.dependsOn.includes(target)
    );
    const result: string[] = [];
    for (const dependency of dependencies) {
      result.push(...this.resolveDependencies(dependency.name));
    }
    return result;
  }
}
