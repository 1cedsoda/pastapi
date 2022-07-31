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
    const files = await this.getFiles(this.folder);
    const schemas = await this.getSchemas(files.schemaPaths);
    const routes = await this.getSchemas(files.routePaths);
    return {
      schemas: schemas,
      routes: routes,
    };
  }

  private async getFiles(folder: string): Promise<CollectedPaths> {
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

  private async getSchemas(files: string[]): Promise<Record<string, Schema>> {
    const schemas: Record<string, object> = {};

    // open every file in airflowFiles.schemaFiles
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

  private async getRoutes(files: string[]): Promise<Record<string, Route>> {
    const routes: Record<string, Route> = {};

    // open every file in airflowFiles.schemaFiles
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
