import { format, loadYaml, parseOperations } from "@pastapi/core";
import * as fs from "fs";
import { generatePaths } from "../src/generate";
import { join } from "path";

export async function generate(basePath: string) {
  console.log("Generating api.ts");
  try {
    const content = fs.readFileSync(join(basePath, "api.yml"), "utf8");
    const spec = await loadYaml(content);

    const operations = parseOperations(spec);
    fs.writeFileSync(
      join(basePath, "gen/api-operations.json"),
      JSON.stringify(operations, null, 2)
    );

    const ts = await format(generatePaths(operations));

    fs.writeFileSync(join(basePath, "gen/api.ts"), ts);
  } catch (e) {
    console.error(e);
  }
}
