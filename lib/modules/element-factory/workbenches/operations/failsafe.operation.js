"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
exports.failsafe = (target) => {
    const folders = target.split('/');
    folders.reduce((acc, curr) => {
        // * NOTICE: Last portion of path will be created
        // * only if target has a trailing slash
        // * .../stairway/to/heaven  (no heaven)
        // * .../stairway/to/heaven/ (now we have a heaven)
        const target = path.join(...acc);
        if (!fs.existsSync(target))
            fs.mkdirSync(target);
        return [...acc, curr];
    }, ['.']);
};
