import * as ct from "../collector/types";
import { RouteParser } from "./RouteParser";
import { SchemaParser } from "./SchemaParser";
import * as pt from "./p_types";
import path from "path";
import fs from "fs";

export class Parser {
  collectorResult: ct.CollectorResult;
  airflowFolder: string;
  constructor(collectorResult: ct.CollectorResult, airflowFolder: string) {
    this.collectorResult = collectorResult;
    this.airflowFolder = airflowFolder;
  }

  parse(): pt.SyntaxTree {
    console.log(`parse`);
    const schemaParser = new SchemaParser(this.collectorResult);
    const routeParser = new RouteParser(this.collectorResult);
    const syntaxTree: pt.SyntaxTree = {
      routes: routeParser.parse(),
      schemas: schemaParser.parse(),
    };
    this.saveSyntaxTree(syntaxTree);
    return syntaxTree;
  }

  async saveSyntaxTree(syntaxTree: pt.SyntaxTree) {
    // ensure folder dist exists
    const distFolder = path.join(this.airflowFolder, "dist");
    if (!fs.existsSync(distFolder)) {
      fs.mkdirSync(distFolder);
    }
    const filePath = path.join(distFolder, "syntax_tree.json");
    fs.writeFile(filePath, JSON.stringify(syntaxTree, null, 2), (err) => {
      if (err) throw err;
      console.log(`Saved syntax tree to ${filePath}`);
    });
  }
}
