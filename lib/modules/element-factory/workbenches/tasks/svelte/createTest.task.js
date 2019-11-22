"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const svelte_params_1 = require("../../params/svelte.params");
// #endregion Local Imports
exports.createTest = (options) => {
    const { templatePath } = svelte_params_1.createStyleParams;
    const { dirPath, templateProps, successMessage } = options;
    const writeFileProps = {
        dirPath: dirPath,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: successMessage
    };
    operations_1.writeFile(writeFileProps);
};
