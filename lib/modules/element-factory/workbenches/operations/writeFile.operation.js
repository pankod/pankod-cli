"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
// #endregion Local Imports
exports.writeFile = (params) => {
    try {
        // TODO: nullcheck path, create if does NOT exist
        fs.writeFileSync(path.resolve('', params.dirPath), params.getFileContent());
        console.info(logSymbols.success, params.message);
    }
    catch (error) {
        console.error(error);
        process.exit(error);
    }
};
