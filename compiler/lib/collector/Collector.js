"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collector = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const js_yaml_1 = require("js-yaml");
class Collector {
    constructor(folder) {
        this.folder = folder;
    }
    collect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = yield this.getFiles(this.folder);
            const schemas = yield this.getSchemas(files.schemaPaths);
            const routes = yield this.getSchemas(files.routePaths);
            return {
                schemas: schemas,
                routes: [],
            };
        });
    }
    getFiles(folder) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // init result
            const result = {
                routePaths: [],
                schemaPaths: [],
            };
            // Read dir
            const dir = yield fs_1.default.promises.readdir(folder);
            // iterate over dir
            dir.forEach((element) => {
                const name = element.split(".")[0];
                if (name.startsWith("route"))
                    result.routePaths.push(element);
                else if (name.startsWith("schema"))
                    result.schemaPaths.push(element);
            });
            return result;
        });
    }
    getSchemas(files) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemas = {};
            // open every file in airflowFiles.schemaFiles
            for (const path of files) {
                const schemaFile = yield fs_1.default.promises.readFile(`${this.folder}/${path}`, "utf8");
                // parse yml
                const yml = (0, js_yaml_1.load)(schemaFile);
                // get top level keys
                Object.keys(yml).forEach((key) => {
                    schemas[key] = yml[key];
                });
            }
            return schemas;
        });
    }
    getRoutes(files) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const routes = {};
            // open every file in airflowFiles.schemaFiles
            for (const path of files) {
                const schemaFile = yield fs_1.default.promises.readFile(`${this.folder}/${path}`, "utf8");
                // parse yml
                const yml = (0, js_yaml_1.load)(schemaFile);
                // get top level keys
                Object.keys(yml).forEach((key) => {
                    routes[key] = yml[key];
                });
            }
            return routes;
        });
    }
}
exports.Collector = Collector;
