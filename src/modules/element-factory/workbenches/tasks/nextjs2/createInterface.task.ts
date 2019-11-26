// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../../typings';
import { getTemplate, writeFile, replaceContent } from '../../operations';
import { createInterfaceParams } from '../../params/nextjs2.params';
// #region Local Imports

export const createInterface = (options: ICommon.IAnswers) => {
    const { fileName, isPage, isConnectStore } = options;

    const {
        interfaceDir,
        pageInterfaceIndex,
        pageInterfaceDir,
        componentsDir,
        templatePath,
        reduxInterfaceDir,
        storeImportInterface,
        storeImportInterfaceFormatted,
        storeInterface
    } = createInterfaceParams;

    options.isClass = !!options.classDir;

    const pageDirPath = `${pageInterfaceDir}/${fileName}.d.ts`;
    const compDirPath = `${componentsDir}/${fileName}/${fileName}.d.ts`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new interface file'
    };

    const commonReplaceParams = (
        contentFile: string,
        message: string,
        regexKey: RegExp
    ) => {
        const formattedRegexKey = /\n} from "@Interfaces";/;

        const params = {
            fileDir: reduxInterfaceDir,
            filetoUpdate: fs.readFileSync(
                path.resolve('', reduxInterfaceDir),
                'utf8'
            ),
            getFileContent: () => getTemplate(contentFile, options),
            message,
            regexKey
        };

        // * Change RegExp if file is formatted
        if (params.filetoUpdate.match(formattedRegexKey)) {
            params.regexKey = formattedRegexKey;
            params.getFileContent = () =>
                getTemplate(storeImportInterfaceFormatted, options);
        }

        return params;
    };

    writeFile(writeFileProps);

    if (isPage) {
        const replaceContentParams: ICommon.IReplaceContent = {
            fileDir: interfaceDir,
            filetoUpdate: fs.readFileSync(
                path.resolve('', interfaceDir),
                'utf8'
            ),
            getFileContent: () => getTemplate(pageInterfaceIndex, options),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: /\/\/ #region Page Interfaces/g
        };

        replaceContent(replaceContentParams);
    }

    if (isConnectStore) {
        const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
            storeInterface,
            'Interface file added to Redux/IStore.d.ts',
            /export interface IStore\s[{]/g
        );

        replaceContent(replaceStoreParams);

        const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
            storeImportInterface,
            'Interface file added to import section in Redux/IStore.d.ts',
            / } from "@Interfaces";/
        );

        replaceContent(replaceStoreImportParams);
    }
};
