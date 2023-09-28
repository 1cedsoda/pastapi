import { format, loadYaml, parseOperations } from "pastapi-core";
import * as fs from "fs";
import { generate as _generate } from "../src/generate";
import { join } from "path";

export async function generate(basePath: string) {
  try {
    // read spec
    const content = fs.readFileSync(join(basePath, "api.yml"), "utf8");
    const spec = await loadYaml(content);

    // ensure gen folder exists
    if (!fs.existsSync(join(basePath, "gen"))) {
      fs.mkdirSync(join(basePath, "gen"));
    }

    // parse
    const operations = parseOperations(spec);
    fs.writeFileSync(
      join(basePath, "gen/api-operations.json"),
      JSON.stringify(operations, null, 2)
    );

    // generate
    const ts = _generate(operations);

    // save
    const formatted = await format(ts);
    fs.writeFileSync(join(basePath, "gen/api.ts"), formatted);
  } catch (e) {
    console.error(e);
  }
}
