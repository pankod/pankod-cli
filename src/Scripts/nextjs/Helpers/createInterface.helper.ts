// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
// #endregion Local Imports

export const createInterface = (
    answers: ICommon.IAnswers,
    isClass: boolean,
    createInterfaceParams: INextjsHelper.ICreateInterfaceParams
) => {
    const {
        fileName,
        lowerFileName,
        isPage = false,
        isConnectStore = false,
        upperFileName
    } = answers;
    const templateProps = { fileName, isClass, lowerFileName, isConnectStore, upperFileName };

    const pageDirPath = `${createInterfaceParams.pageInterfaceDir}/${fileName}.d.ts`;
    const compDirPath = `${createInterfaceParams.compInterfaceDir}/${fileName}.d.ts`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () =>
            CommonHelper.getTemplate(createInterfaceParams.templatePath, templateProps),
        message: 'Added new interface file'
    };

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: createInterfaceParams.interfaceDir,
        filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.interfaceDir), 'utf8'),
        getFileContent: () =>
            CommonHelper.getTemplate(
                isPage
                    ? createInterfaceParams.pageInterfaceIndex
                    : createInterfaceParams.compInterfaceIndex,
                templateProps
            ),
        message: 'Interface file added to Interfaces/index.ts',
        regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
    };

    const commonReplaceParams = (contentFile: string, message: string, regexKey: RegExp) => ({
        fileDir: createInterfaceParams.reduxInterfaceDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', createInterfaceParams.reduxInterfaceDir),
            'utf8'
        ),
        getFileContent: () => CommonHelper.getTemplate(contentFile, templateProps),
        message,
        regexKey
    });

    const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
        createInterfaceParams.storeInterface,
        'Interface file added to Interfaces/Redux/Store.d.ts',
        /export interface IStore\s[{]/g
    );

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.replaceContent(replaceContentParams);

    if (isConnectStore) {
        CommonHelper.replaceContent(replaceStoreParams);

        setTimeout(() => {
            const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
                createInterfaceParams.storeImportInterface,
                'Interface file added to import section in Interfaces/Redux/Store.d.ts',
                /\s[}] from '@Interfaces';/g
            );

            CommonHelper.replaceContent(replaceStoreImportParams);
        }, 100);
    }
};
