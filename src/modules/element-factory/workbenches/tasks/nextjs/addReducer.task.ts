// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
import * as Helpers from '.';
// #endregion Local Imports

export const addReducer = (
    answers: ICommon.IAnswers,
    params: INextjsHelper.IAddReducerParams
): void => {
    const {
        reducerIndexTemplatePath,
        reducerTemplatePath,
        addActionConstIndexParams,
        reducerStoreTemplatePath
    } = params;

    const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;

    const reducerFileDir = `${Config.nextjs.reducerDir}/${lowerFileName}.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName };
    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${Config.nextjs.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${Config.nextjs.reducerDir}/index.ts`),
            'utf8'
        ),
        getFileContent: () => CommonHelper.getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /import { combineReducers } from 'redux';/g
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: reducerFileDir,
        getFileContent: () => CommonHelper.getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.replaceContent(replaceContentParams);

    setTimeout(() => {
        const replaceReducerContentParams: ICommon.IReplaceContent = {
            fileDir: `${Config.nextjs.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(
                path.resolve('', `${Config.nextjs.reducerDir}/index.ts`),
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
