import { loadYaml, parseOperations } from "pastapi-core";
import * as fs from "fs";
import { generate as _generate, generateRaw } from "../src";
import { join } from "path";

export async function generate(basePath: string) {
  return new Promise<void>(async (resolve, reject) => {
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
      fs.writeFileSync(join(basePath, "gen/api-operations.json"), JSON.stringify(operations, null, 2));

      // generate
      let ts = generateRaw(operations);
      try {
        ts = _generate(operations);
      } catch (e) {
        console.error(e);
      }

      // save
      fs.writeFileSync(join(basePath, "gen/client.ts"), ts);
      resolve();
    } catch (e) {
      console.error(e);
    }
  });
}
