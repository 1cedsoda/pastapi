"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaParser = void 0;
const tslib_1 = require("tslib");
class SchemaParser {
    constructor(collectorResult) {
        this.collectedSchemas = {};
        this.collectedSchemas = collectorResult.schemas;
    }
    parse() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let schemas = this.parseAllSchemas(0);
            return {
                schemas: schemas,
            };
        });
    }
    parseAllSchemas(depth) {
        console.log("  ".repeat(depth) + `parseAllSchemas`);
        const schemas = [];
        Object.keys(this.collectedSchemas).forEach((key, i) => {
            let object = this.collectedSchemas[key];
            schemas.push(this.parseSchema(key, object, depth + 1));
        });
        return schemas;
    }
    parseSchema(key, object, depth) {
        console.log("  ".repeat(depth) + `parseSchema: ${key}`);
        if (object.inherit) {
            object.inherit = this.parseInherit(object.inherit, depth + 1);
        }
        if (object.fields) {
            object.fields = this.parseFields(object.fields, depth + 1);
        }
        else {
            object.fields = [];
        }
        return {
            inherit: object.inherit,
            fields: object.fields,
        };
    }
    parseInherit(inherit, depth) {
        console.log("  ".repeat(depth) + `parseInherit`);
        if (!inherit.parent)
            throw new Error("parent must be defined");
        if (!inherit.include)
            inherit.include = [{ key: "*" }];
        if (!inherit.exclude)
            inherit.exclude = [];
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
        return {
            parent: inherit.parent,
            include: inherit.includes !== undefined ? inherit.includes : ["*"],
            exclude: inherit.includes !== undefined ? inherit.includes : [],
        };
    }
    parseFields(fields, depth) {
        console.log("  ".repeat(depth) + `parseFields`);
        if (!Array.isArray(fields))
            throw new Error("fields must be an array");
        const result = fields.map((field) => this.parseField(field, depth + 1));
        return result;
    }
    parseField(field, depth) {
        console.log("  ".repeat(depth) + `parseField: ${field.key}`);
        if (field.key === undefined)
            throw new Error("key must be defined");
        if (field.type === undefined)
            field.type = "string";
        if (field.rules === undefined)
            field.rules = [];
        if (typeof field.key !== "string")
            throw new Error("key must be a string");
        if (typeof field.type !== "string")
            throw new Error("type must be a string");
        if (!Array.isArray(field.rules))
            throw new Error("rules must be an array");
        return {
            key: field.key,
            type: field.type,
            rules: field.rules,
        };
    }
}
exports.SchemaParser = SchemaParser;
