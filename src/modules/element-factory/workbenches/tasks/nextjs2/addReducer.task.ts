// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjs2Helper } from '../../../../typings';
import {
    getTemplate,
    createFile,
    writeFile,
    replaceContent
} from '../../operations';
import { nextjs2 } from '../../../../paths';
import { addActionConstIndex } from '.';
// #region Local Imports

export const addReducer = (
    answers: ICommon.IAnswers,
    params: INextjs2Helper.IAddReducerParams
): void => {
    const {
        reducerIndexTemplatePath,
        reducerTemplatePath,
        addActionConstIndexParams,
        reducerStoreTemplatePath,
        reducerTestTemplatePath
    } = params;

    const { fileName, lowerFileName, isConnectStore, upperFileName } = answers;

    const reducerFolderDir = `${nextjs2.reducerDir}/${lowerFileName}`;
    const reducerFileDir = `${reducerFolderDir}/index.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName };
    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${nextjs2.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${nextjs2.reducerDir}/index.ts`),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /\/\/ #endregion Local Imports/g
    };

    const testFileDir = `${reducerFolderDir}/index.spec.ts`;
    const addTestParams: ICommon.IAddTest = {
        dirPath: testFileDir,
        getFileContent: () =>
            getTemplate(reducerTestTemplatePath, templateProps),
        message: 'Added reducer test'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: reducerFileDir,
        getFileContent: () => getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };

    createFile(reducerFolderDir);
    writeFile(writeFileProps);
    replaceContent(replaceContentParams);
    writeFile(addTestParams);

    setTimeout(() => {
        const replaceReducerContentParams: ICommon.IReplaceContent = {
            fileDir: `${nextjs2.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(
                path.resolve('', `${nextjs2.reducerDir}/index.ts`),
                'utf8'
            ),
            getFileContent: () =>
                getTemplate(reducerStoreTemplatePath, templateProps),
            message:
                'Reducer file added combineReducers in Redux/Reducers/index.ts',
            regexKey: /export default combineReducers[(][{]/g
        };
        replaceContent(replaceReducerContentParams);
    }, 100);

    if (isConnectStore) {
        addActionConstIndex(templateProps, addActionConstIndexParams);
    }
};
