"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const svelte_params_1 = require("../../params/svelte.params");
const _1 = require(".");
// #endregion Local Imports
exports.createComponent = (options) => {
    const { fileName, hasStyle } = options;
    const { componentsDir, templatePath } = svelte_params_1.createComponentParams;
    const componentDir = `${componentsDir}/${fileName}`;
    const writeFileProps = {
        dirPath: `${componentDir}/index.svelte`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Add new component.'
    };
    _1.createTest(options);
    if (hasStyle) {
        _1.createStyle(options);
    }
    operations_1.createFile(componentDir);
    operations_1.writeFile(writeFileProps);
};
