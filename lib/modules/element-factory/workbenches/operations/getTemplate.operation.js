"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
// #endregion Local Imports
exports.getTemplate = (templatePath, templateProps) => {
    // __dirname + ../../ path is root of the lib folder.
    return mustache.render(fs.readFileSync(path.resolve(__dirname, '../../', templatePath), 'utf8'), templateProps);
};
