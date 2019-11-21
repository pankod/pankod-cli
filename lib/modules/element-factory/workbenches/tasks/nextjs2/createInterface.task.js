"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
const nextjs2_params_1 = require("../../params/nextjs2.params");
// #region Local Imports
exports.createInterface = (options) => {
    const { fileName, isPage, isConnectStore, isFuncComponent } = options;
    const { interfaceDir, pageInterfaceIndex, pageInterfaceDir, componentsDir, compInterfaceDir, templatePath, reduxInterfaceDir, storeImportInterface, storeInterface } = nextjs2_params_1.createInterfaceParams;
    options.isClass = !!options.classDir;
    const pageDirPath = `${pageInterfaceDir}/${fileName}.d.ts`;
    let compDirPath;
    if (isFuncComponent) {
        compDirPath = `${componentsDir}/${fileName}/${fileName}.d.ts`;
    }
    else {
        compDirPath = `${compInterfaceDir}/${fileName}.d.ts`;
    }
    const writeFileProps = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new interface file'
    };
    const commonReplaceParams = (contentFile, message, regexKey) => ({
        fileDir: reduxInterfaceDir,
        filetoUpdate: fs.readFileSync(path.resolve('', reduxInterfaceDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(contentFile, options),
        message,
        regexKey
    });
    operations_1.writeFile(writeFileProps);
    if (isPage) {
        const replaceContentParams = {
            fileDir: interfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', interfaceDir), 'utf8'),
            getFileContent: () => operations_1.getTemplate(pageInterfaceIndex, options),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: /\/\/ #region Page Interfaces/g
        };
        operations_1.replaceContent(replaceContentParams);
    }
    if (isConnectStore) {
        const replaceStoreParams = commonReplaceParams(storeInterface, 'Interface file added to Redux/IStore.d.ts', /export interface IStore\s[{]/g);
        operations_1.replaceContent(replaceStoreParams);
        setTimeout(() => {
            const replaceStoreImportParams = commonReplaceParams(storeImportInterface, 'Interface file added to import section in Redux/IStore.d.ts', /\s[}] from "@Interfaces";/g);
            operations_1.replaceContent(replaceStoreImportParams);
        }, 100);
    }
};
