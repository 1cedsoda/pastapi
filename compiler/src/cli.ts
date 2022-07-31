import path from "path";
import { Collector } from "./collector/Collector";
import { SchemaParser } from "./parser/SchemaParser";

async function exec() {
  // init
  console.log("Building Airflow API");
  const cwd = process.cwd();
  console.log(`Current working directory: ${cwd}`);
  // TODO: add support for other folders
  const folder = path.join(cwd, "airflow");

  // 1. Collect
  const collector = new Collector(folder);
  const collectorResult = await collector.collect();

  // 2. Parse
  const schemaParser = new SchemaParser(collectorResult);
  const schemaParserResult = await schemaParser.parse();
}

exec();
