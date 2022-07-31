"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const Collector_1 = require("./collector/Collector");
const SchemaParser_1 = require("./parser/SchemaParser");
function exec() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // init
        console.log("Building Airflow API");
        const cwd = process.cwd();
        console.log(`Current working directory: ${cwd}`);
        // TODO: add support for other folders
        const folder = path_1.default.join(cwd, "airflow");
        // 1. Collect
        const collector = new Collector_1.Collector(folder);
        const collectorResult = yield collector.collect();
        // 2. Parse
        const schemaParser = new SchemaParser_1.SchemaParser(collectorResult);
        const schemaParserResult = yield schemaParser.parse();
    });
}
exec();
