import fs from "fs";
import { load } from "js-yaml";
import * as af from "../parser/sp_types";
import { CollectedPaths, CollectorResult, Schema, Route } from "./types";

export class Collector {
  folder: string;

  constructor(folder: string) {
    this.folder = folder;
  }

  async collect(): Promise<CollectorResult> {
    console.log("collect");
    const files = await this.getFiles(this.folder, 1);
    const schemas = await this.getSchemas(files.schemaPaths, 1);
    const routes = await this.getRoutes(files.routePaths, 1);
    return {
      schemas: schemas,
      routes: routes,
    };
  }

  private async getFiles(
    folder: string,
    depth: number
  ): Promise<CollectedPaths> {
    console.log("  ".repeat(depth) + `getFiles: ${folder}`);
    // init result
    const result: CollectedPaths = {
      routePaths: [],
      schemaPaths: [],
    };

    // Read dir
    const dir = await fs.promises.readdir(folder);

    // iterate over dir
    dir.forEach((element) => {
      const name = element.split(".")[0];
      if (name.startsWith("route")) result.routePaths.push(element);
      else if (name.startsWith("schema")) result.schemaPaths.push(element);
    });

    return result;
  }

  private async getSchemas(
    files: string[],
    depth: number
  ): Promise<Record<string, Schema>> {
    console.log("  ".repeat(depth) + `getSchemas`);
    const schemas: Record<string, object> = {};

    // open every file in pastapiFiles.schemaFiles
    for (const path of files) {
      const schemaFile = await fs.promises.readFile(
        `${this.folder}/${path}`,
        "utf8"
      );

      // parse yml
      const yml = load(schemaFile) as Record<string, object>;

      // get top level keys
      Object.keys(yml).forEach((key) => {
        schemas[key] = yml[key] as any;
      });
    }

    return schemas;
  }

  private async getRoutes(
    files: string[],
    depth: number
  ): Promise<Record<string, Route>> {
    console.log("  ".repeat(depth) + `getRoutes`);
    const routes: Record<string, Route> = {};

    // open every file in pastapiFiles.schemaFiles
    for (const path of files) {
      const schemaFile = await fs.promises.readFile(
        `${this.folder}/${path}`,
        "utf8"
      );

      // parse yml
      const yml = load(schemaFile) as Record<string, object>;

      // get top level keys
      Object.keys(yml).forEach((key) => {
        routes[key] = yml[key] as any;
      });
    }

    return routes;
  }
}
