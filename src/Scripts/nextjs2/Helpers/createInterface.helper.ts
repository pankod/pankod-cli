// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createInterfaceParams } from '../nextjs2.config';
// #region Local Imports

export const createInterface = (options: ICommon.IAnswers) => {
    const {
        fileName,
        lowerFileName,
        isPage,
        isConnectStore,
        isFuncComponent,
        upperFileName,
        isClass = !!options.classDir
    } = options;

    const {
        interfaceDir,
        pageInterfaceIndex,
        pageInterfaceDir,
        componentsDir,
        compInterfaceDir,
        templatePath,
        reduxInterfaceDir,
        storeImportInterface,
        storeInterface
    } = createInterfaceParams;

    const pageDirPath = `${pageInterfaceDir}/${fileName}.d.ts`;
    let compDirPath;

    if (isFuncComponent) {
        compDirPath = `${componentsDir}/${fileName}/${fileName}.d.ts`;
    } else {
        compDirPath = `${compInterfaceDir}/${fileName}.d.ts`;
    }

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => CommonHelper.getTemplate(templatePath, options),
        message: 'Added new interface file'
    };

    const commonReplaceParams = (contentFile: string, message: string, regexKey: RegExp) => ({
        fileDir: reduxInterfaceDir,
        filetoUpdate: fs.readFileSync(path.resolve('', reduxInterfaceDir), 'utf8'),
        getFileContent: () => CommonHelper.getTemplate(contentFile, options),
        message,
        regexKey
    });

    CommonHelper.writeFile(writeFileProps);

    if (isPage) {
        const replaceContentParams: ICommon.IReplaceContent = {
            fileDir: interfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', interfaceDir), 'utf8'),
            getFileContent: () => CommonHelper.getTemplate(pageInterfaceIndex, options),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: /\/\/ #region Page Interfaces/g
        };

        CommonHelper.replaceContent(replaceContentParams);
    }

    if (isConnectStore) {
        const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
            storeInterface,
            'Interface file added to Redux/IStore.d.ts',
            /export interface IStore\s[{]/g
        );

        CommonHelper.replaceContent(replaceStoreParams);

        setTimeout(() => {
            const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
                storeImportInterface,
                'Interface file added to import section in Redux/IStore.d.ts',
                /\s[}] from "@Interfaces";/g
            );

            CommonHelper.replaceContent(replaceStoreImportParams);
        }, 100);
    }
};
