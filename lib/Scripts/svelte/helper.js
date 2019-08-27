"use strict";
//#region Global Imports
Object.defineProperty(exports, "__esModule", { value: true });
//#endregion Global Imports
//#region Local Imports
const Common_1 = require("../Common");
//#endregion Local Imports
exports.Helper = {
    createStyle: (answers, createStyleParams) => {
        const { fileName, lowerFileName } = answers;
        const templateProps = { fileName, lowerFileName };
        const compDirPath = `${createStyleParams.compDirPath}/${answers.fileName}/style.scss`;
        const writeFileProps = {
            dirPath: compDirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createStyleParams.templatePath, templateProps),
            message: 'Added new style file'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    createComponent: (answers, params) => {
        const { lowerFileName, fileName, hasStyle } = answers;
        const componentDir = `${params.componentsDir}/${answers.fileName}`;
        const templateProps = {
            fileName,
            hasStyle,
            lowerFileName
        };
        const writeFileProps = {
            dirPath: `${componentDir}/index.svelte`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(params.templatePath, templateProps),
            message: 'Add new component.'
        };
        Common_1.CommonHelper.createFile(componentDir);
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    createTest: (options) => {
        const writeFileProps = {
            dirPath: options.dirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
    }
};
