"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const fs = require("fs");
const path = require("path");
//#endregion Global Imports
//#region Local Imports
const config_1 = require("../../config");
const Common_1 = require("../Common");
//#endregion Local Imports
exports.Helper = {
    addRoute: (answers, IAddRoutesReplaceParams) => {
        const { hasPath = false, routePath, fileName } = answers;
        const templateProps = {
            fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
            hasPath,
            routePath
        };
        const replaceContentParams = {
            fileDir: IAddRoutesReplaceParams.routesDir,
            filetoUpdate: fs.readFileSync(path.resolve('', IAddRoutesReplaceParams.routesDir), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
            message: `Route added to routes.ts as ${hasPath ? `'/${routePath}'` : `'/${fileName}/index'`}`,
            regexKey: /^(?:[\t ]*(?:\r?\n|\r))+export default routes;/gm
        };
        Common_1.CommonHelper.replaceContent(replaceContentParams);
    },
    createInterface: (answers, isClass, createInterfaceParams) => {
        const { fileName, lowerFileName, isPage = false, isConnectStore = false, isFuncComponent = false, upperFileName } = answers;
        const templateProps = {
            fileName,
            isClass,
            lowerFileName,
            isConnectStore,
            upperFileName,
            isFuncComponent
        };
        const pageDirPath = `${createInterfaceParams.pageInterfaceDir}/${fileName}.d.ts`;
        let compDirPath;
        if (isFuncComponent) {
            compDirPath = `${createInterfaceParams.componentsDir}/${fileName}/${fileName}.d.ts`;
        }
        else {
            compDirPath = `${createInterfaceParams.compInterfaceDir}/${fileName}.d.ts`;
        }
        const writeFileProps = {
            dirPath: isPage ? pageDirPath : compDirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createInterfaceParams.templatePath, templateProps),
            message: 'Added new interface file'
        };
        const replaceContentParams = {
            fileDir: createInterfaceParams.interfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.interfaceDir), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(createInterfaceParams.pageInterfaceIndex, templateProps),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: /\/\/ #region Page Interfaces/g
        };
        const commonReplaceParams = (contentFile, message, regexKey) => ({
            fileDir: createInterfaceParams.reduxInterfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.reduxInterfaceDir), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(contentFile, templateProps),
            message,
            regexKey
        });
        const replaceStoreParams = commonReplaceParams(createInterfaceParams.storeInterface, 'Interface file added to Redux/IStore.d.ts', /export interface IStore\s[{]/g);
        Common_1.CommonHelper.writeFile(writeFileProps);
        if (isPage) {
            Common_1.CommonHelper.replaceContent(replaceContentParams);
        }
        if (isConnectStore) {
            Common_1.CommonHelper.replaceContent(replaceStoreParams);
            setTimeout(() => {
                const replaceStoreImportParams = commonReplaceParams(createInterfaceParams.storeImportInterface, 'Interface file added to import section in Interfaces/Redux/Store.d.ts', /\s[}] from "@Interfaces";/g);
                Common_1.CommonHelper.replaceContent(replaceStoreImportParams);
            }, 100);
        }
    },
    createStyle: (answers, createStyleParams) => {
        const { fileName, isPage = false, lowerFileName } = answers;
        const { isStyledComponent, pageDirPath, compDirPath, pageStyledDirPath, templatePath } = createStyleParams;
        const templateProps = { fileName, lowerFileName };
        let _compDirPath;
        let _pageDirPath;
        if (isStyledComponent) {
            _compDirPath = `${compDirPath}/${answers.fileName}/styled.ts`;
            _pageDirPath =
                `${pageStyledDirPath}/${answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase())}.ts` || '';
        }
        else {
            _compDirPath = `${compDirPath}/${answers.fileName}/style.scss`;
            _pageDirPath = `${pageDirPath}/${answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase())}/style.scss`;
        }
        const writeFileProps = {
            dirPath: isPage ? _pageDirPath : _compDirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new style file'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    addActionConstIndex: (templateProps, params) => {
        const { actionConstTemplatePath } = params;
        const actionConstsDir = `${config_1.Config.nextjs2.definitionsDir}/ActionConsts/ActionConsts.ts`;
        const replaceContentParams = {
            fileDir: actionConstsDir,
            filetoUpdate: fs.readFileSync(path.resolve('', actionConstsDir), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(actionConstTemplatePath, templateProps),
            message: 'Action constants added to Definitions/ActionConsts/ActionConsts.ts',
            regexKey: /export const ActionConsts\s[=]\s[{]/g
        };
        Common_1.CommonHelper.replaceContent(replaceContentParams);
    },
    addAction: (answers, params) => {
        const { actionIndexTemplatePath, actionTemplatePath, actionTestTemplatePath } = params;
        const { fileName, lowerFileName } = answers;
        const actionFolderDir = `${config_1.Config.nextjs2.actionDir}/${fileName}Actions`;
        const actionFileDir = `${actionFolderDir}/index.ts`;
        const testFileDir = `${actionFolderDir}/index.spec.ts`;
        const templateProps = { fileName, lowerFileName };
        const writeFileProps = {
            dirPath: actionFileDir,
            getFileContent: () => Common_1.CommonHelper.getTemplate(actionTemplatePath, templateProps),
            message: 'Added new action file'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.nextjs2.actionDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(actionIndexTemplatePath, templateProps),
            message: 'Added action file to index.ts Actions/index.ts'
        };
        const addTestParams = {
            dirPath: testFileDir,
            getFileContent: () => Common_1.CommonHelper.getTemplate(actionTestTemplatePath, templateProps),
            message: 'Added action test'
        };
        Common_1.CommonHelper.createFile(actionFolderDir);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.writeFile(addTestParams);
    },
    addReducer: (answers, params) => {
        const { reducerIndexTemplatePath, reducerTemplatePath, addActionConstIndexParams, reducerStoreTemplatePath } = params;
        const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;
        const reducerFileDir = `${config_1.Config.nextjs2.reducerDir}/${lowerFileName}.ts`;
        const templateProps = { fileName, lowerFileName, upperFileName };
        const replaceContentParams = {
            fileDir: `${config_1.Config.nextjs2.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs2.reducerDir}/index.ts`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(reducerIndexTemplatePath, templateProps),
            message: 'Reducer added to Redux/Reducers/index.ts',
            regexKey: /\/\/ #endregion Local Imports/g
        };
        const writeFileProps = {
            dirPath: reducerFileDir,
            getFileContent: () => Common_1.CommonHelper.getTemplate(reducerTemplatePath, templateProps),
            message: 'Added new reducer file'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.replaceContent(replaceContentParams);
        setTimeout(() => {
            const replaceReducerContentParams = {
                fileDir: `${config_1.Config.nextjs2.reducerDir}/index.ts`,
                filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs2.reducerDir}/index.ts`), 'utf8'),
                getFileContent: () => Common_1.CommonHelper.getTemplate(reducerStoreTemplatePath, templateProps),
                message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
                regexKey: /export default combineReducers[(][{]/g
            };
            Common_1.CommonHelper.replaceContent(replaceReducerContentParams);
        }, 100);
        if (isConnectStore) {
            exports.Helper.addActionConstIndex(templateProps, addActionConstIndexParams);
        }
    },
    createClassComponent: (answers, params) => {
        const { templatePath, indexTemplatePath, createInterfaceParams, addReducerParams, addActionParams } = params;
        const { lowerFileName, isConnectStore = false, isPage = false } = answers;
        const pagesDir = `${config_1.Config.nextjs2.pagesDir}/${lowerFileName}`;
        const classDir = isPage ? pagesDir : `${config_1.Config.nextjs2.componentsDir}/${answers.fileName}`;
        const templateProps = {
            fileName: answers.fileName,
            hasStyle: answers.hasStyle,
            interfaceName: `I${answers.fileName}`,
            isConnectStore: answers.isConnectStore,
            lowerFileName: answers.lowerFileName,
            upperFileName: answers.upperFileName,
            isStyled: answers.isStyled,
            isScss: answers.isScss
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.nextjs2.componentsDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplatePath, templateProps),
            message: 'Component added to index.ts'
        };
        const writeFileProps = {
            dirPath: `${classDir}/index.tsx`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new class component'
        };
        Common_1.CommonHelper.createFile(classDir);
        Common_1.CommonHelper.writeFile(writeFileProps);
        exports.Helper.createInterface(answers, true, createInterfaceParams);
        if (isConnectStore) {
            exports.Helper.addReducer(templateProps, addReducerParams);
            exports.Helper.addAction(templateProps, addActionParams);
        }
        if (!isPage) {
            Common_1.CommonHelper.addToIndex(addIndexParams);
        }
    },
    createFuncComponent: (answers, params) => {
        const { lowerFileName, fileName, isScss } = answers;
        const funcDir = `${params.componentsDir}/${answers.fileName}`;
        const templateProps = {
            fileName,
            isScss,
            interfaceName: `I${fileName}`,
            lowerFileName
        };
        const addIndexParams = {
            dirPath: `${params.componentsDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(params.indexTemplatePath, templateProps),
            message: 'Component added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${funcDir}/index.tsx`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(params.templatePath, templateProps),
            message: 'Add new functional component.'
        };
        Common_1.CommonHelper.createFile(funcDir);
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createInterface(answers, false, params.createInterfaceParams);
    }
};
