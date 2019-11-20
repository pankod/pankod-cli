// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import * as paths from '../../../../paths';
import { INextjs2Helper } from '../INextjs2Types';
import * as Helpers from '.';
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

    const reducerFolderDir = `${paths.nextjs2.reducerDir}/${lowerFileName}`;
    const reducerFileDir = `${reducerFolderDir}/index.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName };
    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${paths.nextjs2.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${paths.nextjs2.reducerDir}/index.ts`),
            'utf8'
        ),
        getFileContent: () => CommonHelper.getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /\/\/ #endregion Local Imports/g
    };

    const testFileDir = `${reducerFolderDir}/index.spec.ts`;
    const addTestParams: ICommon.IAddTest = {
        dirPath: testFileDir,
        getFileContent: () => CommonHelper.getTemplate(reducerTestTemplatePath, templateProps),
        message: 'Added reducer test'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: reducerFileDir,
        getFileContent: () => CommonHelper.getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };

    CommonHelper.createFile(reducerFolderDir);
    CommonHelper.writeFile(writeFileProps);
    CommonHelper.replaceContent(replaceContentParams);
    CommonHelper.writeFile(addTestParams);

    setTimeout(() => {
        const replaceReducerContentParams: ICommon.IReplaceContent = {
            fileDir: `${paths.nextjs2.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(
                path.resolve('', `${paths.nextjs2.reducerDir}/index.ts`),
                'utf8'
            ),
            getFileContent: () => CommonHelper.getTemplate(reducerStoreTemplatePath, templateProps),
            message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
            regexKey: /export default combineReducers[(][{]/g
        };
        CommonHelper.replaceContent(replaceReducerContentParams);
    }, 100);

    if (isConnectStore) {
        Helpers.addActionConstIndex(templateProps, addActionConstIndexParams);
    }
};
