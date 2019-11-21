"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const nextjs2_params_1 = require("../../params/nextjs2.params");
const _1 = require(".");
// #region Local Imports
exports.createFuncComponent = (options) => {
    const { componentsDir, templatePath, indexTemplatePath, componentTestTemplatePath } = nextjs2_params_1.createFuncComponentParams;
    const { fileName, hasStyle } = options;
    options.isScss = hasStyle === 'scss';
    options.isStyled = hasStyle === 'styled';
    const funcComponentDir = `${componentsDir}/${fileName}`;
    // TODO: # Modularize Preparation of Props
    const addIndexParams = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplatePath, options),
        message: 'Component added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${funcComponentDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new functional component.'
    };
    const writeTestFileProps = {
        dirPath: `${funcComponentDir}/index.spec.tsx`,
        getFileContent: () => operations_1.getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };
    // TODO: / Modularize Preparation of Props
    operations_1.createFile(funcComponentDir);
    operations_1.writeFile(writeFileProps);
    operations_1.writeFile(writeTestFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createInterface(options);
    _1.createStyle(options);
};
