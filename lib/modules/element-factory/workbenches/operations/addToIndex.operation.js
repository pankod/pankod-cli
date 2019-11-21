"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk_1 = require("chalk");
// #endregion Local Imports
exports.addToIndex = (params) => {
    fs.appendFileSync(path.resolve('', params.dirPath), `${params.getFileContent()}`);
    console.log(chalk_1.default.green(logSymbols.success, params.message));
};
