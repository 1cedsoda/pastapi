import path from "path";
import { Collector } from "./collector/Collector";
import { SyntaxTree } from "./parser/p_types";
import { Parser } from "./parser/Parser";

async function exec() {
  // init
  console.log("Building Airflow API");
  const cwd = process.cwd();
  // TODO: add support for other folders
  const airflowFolder = path.join(cwd, "airflow");

  // Get current time
  const startTime = new Date();

  // 1. Collect
  const collector = new Collector(airflowFolder);
  const collectorResult = await collector.collect();

  // 2. Parse
  const parser = new Parser(collectorResult, airflowFolder);
  const syntaxTree = await parser.parse();

  // Done
  const stopTime = new Date();
  console.log(`Compiled in ${stopTime.getTime() - startTime.getTime()}ms`);

  console.log("\n", JSON.stringify(syntaxTree, null, 2));
}

exec();
