// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import * as paths from '../../../../paths';
import { INextjs2Helper } from '../INextjs2Types';
// #region Local Imports

export const addAction = (
    answers: ICommon.IAnswers,
    params: INextjs2Helper.IAddActionParams
): void => {
    const { actionIndexTemplatePath, actionTemplatePath, actionTestTemplatePath } = params;
    const { fileName, lowerFileName } = answers;
    const actionFolderDir = `${paths.nextjs2.actionDir}/${fileName}Actions`;
    const actionFileDir = `${actionFolderDir}/index.ts`;
    const testFileDir = `${actionFolderDir}/index.spec.ts`;
    const templateProps = { fileName, lowerFileName };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: actionFileDir,
        getFileContent: () => CommonHelper.getTemplate(actionTemplatePath, templateProps),
        message: 'Added new action file'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${paths.nextjs2.actionDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(actionIndexTemplatePath, templateProps),
        message: 'Added action file to index.ts Actions/index.ts'
    };

    const addTestParams: ICommon.IAddTest = {
        dirPath: testFileDir,
        getFileContent: () => CommonHelper.getTemplate(actionTestTemplatePath, templateProps),
        message: 'Added action test'
    };

    CommonHelper.createFile(actionFolderDir);
    CommonHelper.addToIndex(addIndexParams);
    CommonHelper.writeFile(writeFileProps);
    CommonHelper.writeFile(addTestParams);
};
