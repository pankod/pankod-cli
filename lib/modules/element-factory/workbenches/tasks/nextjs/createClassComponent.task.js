"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../../../../paths");
const operations_1 = require("../../operations");
const nextjs_params_1 = require("../../params/nextjs.params");
const _1 = require(".");
// #endregion Local Imports
exports.createClassComponent = (answers) => {
    const { templatePath, indexTemplatePath, createInterfaceParams, addReducerParams, addActionParams } = nextjs_params_1.createClassComponentParams;
    const { lowerFileName, isConnectStore = false, isPage = false } = answers;
    const pagesDir = `${paths_1.nextjs.pagesDir}/${lowerFileName}`;
    const classDir = isPage
        ? pagesDir
        : `${paths_1.nextjs.componentsDir}/${answers.fileName}`;
    const templateProps = {
        fileName: answers.fileName,
        hasStyle: answers.hasStyle,
        interfaceName: `I${answers.fileName}`,
        isConnectStore: answers.isConnectStore,
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };
    const addIndexParams = {
        dirPath: `${paths_1.nextjs.componentsDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts'
    };
    const writeFileProps = {
        dirPath: `${classDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: 'Added new class component'
    };
    operations_1.createFile(classDir);
    operations_1.writeFile(writeFileProps);
    _1.createInterface(answers, true, createInterfaceParams);
    if (isConnectStore) {
        _1.addReducer(templateProps, addReducerParams);
        _1.addAction(templateProps, addActionParams);
    }
    if (!isPage) {
        operations_1.addToIndex(addIndexParams);
    }
};
