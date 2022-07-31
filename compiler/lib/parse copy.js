"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const js_yaml_1 = require("js-yaml");
const af = tslib_1.__importStar(require("./parser/sp_types"));
class Parser {
    constructor(folder) {
        this.schemas = [];
        this.declarations = {};
        this.declarationKeys = [];
        this.folder = folder;
    }
    parse() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const airflowFiles = yield this.getFilePaths();
            this.declarations = yield this.getDeclarations(airflowFiles);
            console.log(this.declarations);
            this.declarationKeys = Object.keys(this.declarations);
            this.parseSchemas(0);
            return {
                schemas: this.schemas,
            };
        });
    }
    hasDeclaration(type) {
        return this.declarationKeys.includes(type);
    }
    getFilePaths() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemaFilePaths = yield fs_1.default.promises.readdir(this.folder);
            const airflowFiles = {
                routeFiles: [],
                schemaFiles: [],
            };
            schemaFilePaths.forEach((filePath) => {
                const fileName = filePath.split(".")[0];
                if (fileName.startsWith("route")) {
                    airflowFiles.routeFiles.push(filePath);
                }
                else if (fileName.startsWith("schema")) {
                    airflowFiles.schemaFiles.push(filePath);
                }
            });
            return airflowFiles;
        });
    }
    getDeclarations(airflowFiles) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemaDeclarations = {};
            // open every file in airflowFiles.schemaFiles
            for (const schemaFilePath of airflowFiles.schemaFiles) {
                const schemaFile = yield fs_1.default.promises.readFile(`${this.folder}/${schemaFilePath}`, "utf8");
                // parse yml
                const schemaFileYml = (0, js_yaml_1.load)(schemaFile);
                // get top level keys
                Object.keys(schemaFileYml).forEach((schemaName) => {
                    schemaDeclarations[schemaName] = schemaFileYml[schemaName];
                });
            }
            return schemaDeclarations;
        });
    }
    parseSchemas(depth) {
        console.log("  ".repeat(depth) + `parseSchemas`);
        Object.keys(this.declarations).forEach((name, i) => {
            this.schemas.push(this.parseSchema(name, depth + 1));
        });
    }
    parseSchema(name, depth) {
        console.log("  ".repeat(depth) + `parseSchema: ${name}`);
        // return fram cache
        for (const schema of this.schemas) {
            if (schema.name == name) {
                console.log("  ".repeat(depth) + `=> from cache`);
                return schema;
            }
        }
        const declaration = this.declarations[name];
        // NativeType
        if (af.nativeTypes.includes(declaration.type)) {
            console.log("  ".repeat(depth) + `=> is native type`);
            return this.parseNativeSchema(name, declaration, depth + 1);
        }
        // No type
        throw new Error(`Unknown: ${declaration["type"]}`);
    }
    parseNativeSchema(name, declaration, depth) {
        console.log("  ".repeat(depth) + `parseNativeSchema: ${name}`);
        const s = {
            name: name,
            type: declaration.type,
            rules: declaration.rules,
        };
        return s;
    }
    parseObjectSchema(name, declaration, depth) {
        console.log("  ".repeat(depth) + `parseObjectSchema: ${name}`);
        const s = {
            name: name,
            extends: declaration.extends
                ? this.parseObjectExtension(declaration.extends, depth + 1)
                : undefined,
            fields: declaration.fields
                ? this.parseObjectSchemaFields(declaration.fields, depth + 1)
                : undefined,
        };
        return s;
    }
    parseObjectExtension(extendsType, depth) {
        console.log("  ".repeat(depth) + `parseObjectExtension: ${extendsType}`);
        // Check if extended schemea excists
        if (extendsType && !this.hasDeclaration(extendsType)) {
            throw new Error(`Unknown schema: ${extendsType}`);
        }
        // const ose: af.ObjectSchemaExtension = {
        //   type: extendsType,
        //   includes: this.parseObjectExtensionIncludes(extendsType, ),
        //   excludes: this.parseObjectExtensionIncludes(),
        // };
        return {
            type: extendsType,
            includes: ["*"],
        };
    }
    // parseObjectExtensionIncludes(
    //   extendsType: string,
    //   field: string,
    // ): string[] {
    //   const extendsSchema: af.ObjectSchema =
    // }
    // parseObjectExtensionExludes(
    //   extendsType: string,
    //   field: string,
    // ): string[] {
    // }
    parseObjectSchemaFields(fields, depth) {
        console.log("  ".repeat(depth) + `parseObjectSchemaFields: ${fields}`);
        const f = {};
        for (let fieldKey of Object.keys(fields)) {
            f[fieldKey] = this.parseObjectSchemaField(fields[fieldKey], this.declarations, depth + 1);
        }
        return f;
    }
    parseObjectSchemaField(type, declarations, depth) {
        console.log("  ".repeat(depth) + `parseObjectSchemaField: ${type}`);
        if (!this.hasDeclaration(type) && !af.nativeTypes.includes(type)) {
            throw new Error(`Unknown schema or type: ${type}`);
        }
        const osf = {
            type: type,
        };
        return osf;
    }
}
exports.Parser = Parser;
