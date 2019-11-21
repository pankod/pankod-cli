// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjsHelper } from '../../../../typings';
import { getTemplate, writeFile, replaceContent } from '../../operations';
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

    const templateProps = {
        fileName,
        isClass,
        lowerFileName,
        isConnectStore,
        upperFileName
    };

    const pageDirPath = `${createInterfaceParams.pageInterfaceDir}/${fileName}.d.ts`;

    const compDirPath = `${createInterfaceParams.compInterfaceDir}/${fileName}.d.ts`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () =>
            getTemplate(createInterfaceParams.templatePath, templateProps),
        message: 'Added new interface file'
    };

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: createInterfaceParams.interfaceDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', createInterfaceParams.interfaceDir),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(
                isPage
                    ? createInterfaceParams.pageInterfaceIndex
                    : createInterfaceParams.compInterfaceIndex,
                templateProps
            ),
        message: 'Interface file added to Interfaces/index.ts',
        regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
    };

    const commonReplaceParams = (
        contentFile: string,
        message: string,
        regexKey: RegExp
    ) => ({
        fileDir: createInterfaceParams.reduxInterfaceDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', createInterfaceParams.reduxInterfaceDir),
            'utf8'
        ),
        getFileContent: () => getTemplate(contentFile, templateProps),
        message,
        regexKey
    });

    const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
        createInterfaceParams.storeInterface,
        'Interface file added to Interfaces/Redux/Store.d.ts',
        /export interface IStore\s[{]/g
    );

    writeFile(writeFileProps);
    replaceContent(replaceContentParams);

    if (isConnectStore) {
        replaceContent(replaceStoreParams);

        setTimeout(() => {
            const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
                createInterfaceParams.storeImportInterface,
                'Interface file added to import section in Interfaces/Redux/Store.d.ts',
                /\s[}] from '@Interfaces';/g
            );

            replaceContent(replaceStoreImportParams);
        }, 100);
    }
};
