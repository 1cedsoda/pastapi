import { Collector } from "./collector/Collector";
import { SyntaxTree } from "./parser/p_types";
import { Parser } from "./parser/Parser";
import { Validator } from "./validator/Validator";
import { GeneratorManager } from "./generators/generators";

export class Airflow {
  airflowFolder: string;
  targets: string[];
  constructor(airflowFolder: string, targets: string[]) {
    this.airflowFolder = airflowFolder;
    this.targets = targets;
  }
  async build(): Promise<void> {
    // 1. Collect
    const collector = new Collector(this.airflowFolder);
    const collectorResult = await collector.collect();

    // 2. Parse
    const parser = new Parser(collectorResult, this.airflowFolder);
    const syntaxTree = await parser.parse();

    // 3. Validate
    const validator = new Validator(syntaxTree);
    validator.validate();

    // 4. Generate
    const generatorManager = new GeneratorManager(this.targets, syntaxTree);
    await generatorManager.compile();
  }
}
