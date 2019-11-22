"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk_1 = require("chalk");
const _1 = require(".");
// #endregion Local Imports
exports.addToIndex = (params) => {
    _1.failsafe(params.dirPath);
    fs.appendFileSync(path.resolve('', params.dirPath), `${params.getFileContent()}`);
    console.log(chalk_1.default.green(logSymbols.success, params.message));
};
