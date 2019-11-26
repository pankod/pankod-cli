"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
exports.failsafe = (target) => {
    const folders = path
        .resolve(target)
        .split('/')
        .splice(1);
    // * If ends with trailing slash, last folder
    // * will be created too.
    target.match(/\/$/) && folders.push('');
    folders.reduce((acc, curr) => {
        const target = path.join(...acc);
        if (!fs.existsSync(target))
            fs.mkdirSync(target);
        return [...acc, curr];
    }, ['/']);
};
