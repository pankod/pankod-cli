"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
exports.createFile = (dirPath) => {
    fs.mkdirSync(path.resolve('', dirPath));
};
