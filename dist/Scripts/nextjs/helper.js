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
    addRoute: (answers) => {
        const { isHavePath = false, routePath, fileName } = answers;
        const templateProps = {
            fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
            isHavePath,
            routePath
        };
        const replaceContentParams = {
            fileDir: `${config_1.Config.nextjs.routesDir}/routes.js`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.routesDir}/routes.js`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate('./dist/Templates/nextjs/Routes.mustache', templateProps),
            message: `Route added to routes.js as ${isHavePath ? `'/${routePath}'` : `'/${fileName}/index'`}`,
            regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm
        };
        Common_1.CommonHelper.replaceContent(replaceContentParams);
    },
    createInterface: (answers, isClass) => {
        const { fileName, lowerFileName, isPage = false, isConnectStore = false, upperFileName } = answers;
        const templatePath = './dist/Templates/nextjs/Interfaces/Component.mustache';
        const templateProps = { fileName, isClass, lowerFileName, isConnectStore, upperFileName };
        const pageDirPath = `${config_1.Config.nextjs.pageInterfaceDir}/${fileName}.d.ts`;
        const compDirPath = `${config_1.Config.nextjs.compInterfaceDir}/${fileName}.d.ts`;
        const pageInterfaceIndex = './dist/Templates/nextjs/Interfaces/PageIndex.mustache';
        const compIntefaceIndex = './dist/Templates/nextjs/Interfaces/ComponentIndex.mustache';
        const storeInterface = './dist/Templates/nextjs/Interfaces/ReduxStore.mustache';
        const storeImportInterface = './dist/Templates/nextjs/Interfaces/ReduxImport.mustache';
        const writeFileProps = {
            dirPath: isPage ? pageDirPath : compDirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new interface file'
        };
        const replaceContentParams = {
            fileDir: `${config_1.Config.nextjs.interfaceDir}/index.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.interfaceDir}/index.ts`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(isPage ? pageInterfaceIndex : compIntefaceIndex, templateProps),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
        };
        const replaceStoreParams = {
            fileDir: `${config_1.Config.nextjs.reduxInterfaceDir}/Store.d.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.reduxInterfaceDir}/Store.d.ts`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(storeInterface, templateProps),
            message: 'Interface file added to Interfaces/Redux/Store.d.ts',
            regexKey: /export interface IStore\s[{]/g
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.replaceContent(replaceContentParams);
        if (isConnectStore) {
            Common_1.CommonHelper.replaceContent(replaceStoreParams);
            setTimeout(() => {
                const replaceStoreImportParams = {
                    fileDir: `${config_1.Config.nextjs.reduxInterfaceDir}/Store.d.ts`,
                    filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.reduxInterfaceDir}/Store.d.ts`), 'utf8'),
                    getFileContent: () => Common_1.CommonHelper.getTemplate(storeImportInterface, templateProps),
                    message: 'Interface file added to import section in Interfaces/Redux/Store.d.ts',
                    regexKey: /\s[}] from '@Interfaces';/g
                };
                Common_1.CommonHelper.replaceContent(replaceStoreImportParams);
            }, 1500);
        }
    },
    createStyle: (answers) => {
        const { fileName, isPage = false, lowerFileName } = answers;
        const templatePath = './dist/Templates/nextjs/Styles.mustache';
        const templateProps = { fileName, lowerFileName };
        const pageDirPath = `${config_1.Config.nextjs.pagesDir}/${answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase())}/style.scss`;
        const compDirPath = `${config_1.Config.nextjs.componentsDir}/${answers.fileName}/style.scss`;
        const writeFileProps = {
            dirPath: isPage ? pageDirPath : compDirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new style file'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    addActionConstIndex: (templateProps) => {
        const replaceContentParams = {
            fileDir: `${config_1.Config.nextjs.definitionsDir}/ActionConsts.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.definitionsDir}/ActionConsts.ts`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/ActionConst.mustache', templateProps),
            message: 'Action constants added to Definitions/ActionConsts.ts',
            regexKey: /export const ActionConsts\s[=]\s[{]/g
        };
        Common_1.CommonHelper.replaceContent(replaceContentParams);
    },
    addAction: (answers) => {
        const { fileName } = answers;
        const actionFileDir = `${config_1.Config.nextjs.actionDir}/${fileName}Actions.ts`;
        const actionTemplate = './dist/Templates/nextjs/Reducers/Action.mustache';
        const indexTemplate = './dist/Templates/nextjs/Reducers/ActionIndex.mustache';
        const templateProps = { fileName };
        const writeFileProps = {
            dirPath: actionFileDir,
            getFileContent: () => Common_1.CommonHelper.getTemplate(actionTemplate, templateProps),
            message: 'Added new action file'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.nextjs.actionDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Added action file to index.ts Actions/index.ts'
        };
        Common_1.CommonHelper.addToIndex(addIndexParams);
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    addReducer: (answers) => {
        const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;
        const reducerFileDir = `${config_1.Config.nextjs.reducerDir}/${lowerFileName}.ts`;
        const reducerTemplate = './dist/Templates/nextjs/Reducers/Reducer.mustache';
        const templateProps = { fileName, lowerFileName, upperFileName };
        const replaceContentParams = {
            fileDir: `${config_1.Config.nextjs.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.reducerDir}/index.ts`), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/index.mustache', templateProps),
            message: 'Reducer added to Redux/Reducers/index.ts',
            regexKey: /import { combineReducers } from 'redux';/g
        };
        const writeFileProps = {
            dirPath: reducerFileDir,
            getFileContent: () => Common_1.CommonHelper.getTemplate(reducerTemplate, templateProps),
            message: 'Added new reducer file'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.replaceContent(replaceContentParams);
        setTimeout(() => {
            const replaceReducerContentParams = {
                fileDir: `${config_1.Config.nextjs.reducerDir}/index.ts`,
                filetoUpdate: fs.readFileSync(path.resolve('', `${config_1.Config.nextjs.reducerDir}/index.ts`), 'utf8'),
                getFileContent: () => Common_1.CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/Store.mustache', templateProps),
                message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
                regexKey: /export default combineReducers[(][{]/g
            };
            Common_1.CommonHelper.replaceContent(replaceReducerContentParams);
        }, 1500);
        if (isConnectStore) {
            exports.Helper.addActionConstIndex(templateProps);
        }
    },
    createClassComponent: (answers) => {
        const { lowerFileName, isConnectStore = false, isPage = false } = answers;
        const pagesDir = `${config_1.Config.nextjs.pagesDir}/${lowerFileName}`;
        const classDir = isPage ? pagesDir : `${config_1.Config.nextjs.componentsDir}/${answers.fileName}`;
        const templatePath = './dist/Templates/nextjs/Components/Class.mustache';
        const templateProps = {
            fileName: answers.fileName,
            interfaceName: `I${answers.fileName}`,
            isConnectStore: answers.isConnectStore,
            isHaveStyle: answers.isHaveStyle,
            lowerFileName: answers.lowerFileName,
            upperFileName: answers.upperFileName
        };
        const indexTemplate = './dist/Templates/nextjs/Components/index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.nextjs.componentsDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Component added to index.ts'
        };
        const writeFileProps = {
            dirPath: `${classDir}/index.tsx`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new class component'
        };
        Common_1.CommonHelper.createFile(classDir);
        Common_1.CommonHelper.writeFile(writeFileProps);
        exports.Helper.createInterface(answers, true);
        if (isConnectStore) {
            exports.Helper.addReducer(templateProps);
            exports.Helper.addAction(templateProps);
        }
        if (!isPage) {
            Common_1.CommonHelper.addToIndex(addIndexParams);
        }
    },
    createFuncComponent: (answers) => {
        const { lowerFileName, fileName, isHaveStyle } = answers;
        const funcDir = `${config_1.Config.nextjs.componentsDir}/${answers.fileName}`;
        const templatePath = './dist/Templates/nextjs/Components/Functional.mustache';
        const templateProps = {
            fileName,
            interfaceName: `I${fileName}`,
            isHaveStyle,
            lowerFileName
        };
        const indexTemplate = './dist/Templates/nextjs/Components/index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.nextjs.componentsDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Component added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${funcDir}/index.tsx`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Add new functional component.'
        };
        Common_1.CommonHelper.createFile(funcDir);
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createInterface(answers, false);
    }
};
//# sourceMappingURL=helper.js.map