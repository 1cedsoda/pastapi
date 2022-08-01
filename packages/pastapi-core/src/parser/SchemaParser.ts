import fs from "fs";
import { load } from "js-yaml";
import * as ct from "../collector/types";
import * as spt from "./sp_types";

export class SchemaParser {
  collectedSchemas: Record<string, ct.Schema> = {};

  constructor(collectorResult: ct.CollectorResult) {
    this.collectedSchemas = collectorResult.schemas;
  }

  parse(): spt.Schema[] {
    return this.parseAllSchemas(1);
  }

  private parseAllSchemas(depth: number): spt.Schema[] {
    console.log("  ".repeat(depth) + `parseAllSchemas`);
    const schemas: spt.Schema[] = [];
    Object.keys(this.collectedSchemas).forEach((key, i) => {
      let object = this.collectedSchemas[key];
      schemas.push(this.parseSchema(key, object, depth + 1));
    });
    return schemas;
  }

  private parseSchema(key: string, object: any, depth: number): spt.Schema {
    console.log("  ".repeat(depth) + `parseSchema: ${key}`);

    if (object.inherit) {
      object.inherit = this.parseInherit(object.inherit, depth + 1);
    }
    if (object.fields) {
      object.fields = this.parseFields(object.fields, depth + 1);
    } else {
      object.fields = [];
    }

    return {
      name: key,
      inherit: object.inherit,
      fields: object.fields,
    };
  }

  private parseInherit(inherit: any, depth: number): spt.SchemaInheritance {
    console.log("  ".repeat(depth) + `parseInherit: ${inherit.parent}`);

    if (!inherit.parent) throw new Error("parent must be defined");
    if (!inherit.include) inherit.include = [{ key: "*" }];
    if (!inherit.exclude) inherit.exclude = [];

    if (typeof inherit.parent !== "string")
      throw new Error("parent must be a string");
    if (!Array.isArray(inherit.include))
      throw new Error("include must be an array");
    if (!Array.isArray(inherit.exclude))
      throw new Error("exclude must be an array");

    for (let include of inherit.include) {
      if (typeof include.key !== "string")
        throw new Error("include.key must be a string");
    }
    for (let exclude of inherit.exclude) {
      if (typeof exclude.key !== "string")
        throw new Error("exclude.key must be a string");
    }

    //TODO: validate types in includes excludes

    const { newType, typeModifiers, rules } = this.parseType(inherit.parent);

    return {
      type: newType,
      include: inherit.includes !== undefined ? inherit.includes : ["*"],
      exclude: inherit.includes !== undefined ? inherit.includes : [],
      typeModifiers: typeModifiers,
      rules: [...rules],
    };
  }

  private parseFields(fields: any, depth: number): spt.Field[] {
    console.log("  ".repeat(depth) + `parseFields`);

    if (!Array.isArray(fields)) throw new Error("fields must be an array");

    const result: spt.Field[] = fields.map((field) =>
      this.parseField(field, depth + 1)
    );
    return result;
  }

  private parseField(field: any, depth: number): spt.Field {
    console.log("  ".repeat(depth) + `parseField: ${field.key}`);

    if (field.key === undefined) throw new Error("key must be defined");
    if (field.type === undefined) field.type = "string";
    if (field.rules === undefined) field.rules = [];

    if (typeof field.key !== "string") throw new Error("key must be a string");
    if (typeof field.type !== "string")
      throw new Error("type must be a string");
    if (!Array.isArray(field.rules)) throw new Error("rules must be an array");

    const { newType, typeModifiers, rules } = this.parseType(field.type);

    return {
      key: field.key,
      type: newType,
      rules: [...rules, ...field.rules],
      typeModifiers: typeModifiers,
    };
  }

  private parseType(type: string): {
    newType: string;
    typeModifiers: spt.TypeModifiers;
    rules: string[];
  } {
    const newType = type
      .replaceAll("!", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll("?", "");
    return {
      newType: newType,
      typeModifiers: {
        nullable: type.endsWith("?"),
        list: type.includes("[]"),
        listElementNullable: type.includes("?[]"),
      },
      rules: type.startsWith("+") ? ["required"] : [],
    };
  }
}
