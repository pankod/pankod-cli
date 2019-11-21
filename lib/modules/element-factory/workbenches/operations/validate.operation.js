"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations = require(".");
// #endregion Local Imports
exports.validate = (val, dirPath, isFile, fileType) => {
    if (val.length) {
        if (operations.isAlreadyExist(dirPath, val, isFile, fileType)) {
            return `This ${fileType} name already used before, enter new name.`;
        }
        return true;
    }
    return 'Can not be empty';
};
