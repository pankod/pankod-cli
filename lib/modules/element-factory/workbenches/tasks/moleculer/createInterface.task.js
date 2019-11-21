"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
// #endregion Local Imports
exports.createInterface = (answers, dirType, prefix = '', createInterfaceParams) => {
    const templatePath = `${createInterfaceParams.templatePath}/${prefix}Interface.mustache`;
    const templateProps = { upperFileName: answers.upperFileName, dirType };
    const interfaceFilePath = `${paths_1.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
    const interfaceDirPath = `${paths_1.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}`;
    const writeFileProps = {
        dirPath: interfaceFilePath,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: 'Created new interface file.'
    };
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.interfaceDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(createInterfaceParams.indexInterfaceTemplate, templateProps),
        message: 'Interface added to index.ts.'
    };
    const addFolderIndex = {
        dirPath: `${paths_1.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
        getFileContent: () => operations_1.getTemplate(createInterfaceParams.folderIndexTemplate, templateProps),
        message: 'Interface added to folder index.ts.'
    };
    operations_1.createFile(interfaceDirPath);
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    operations_1.addToIndex(addFolderIndex);
};
