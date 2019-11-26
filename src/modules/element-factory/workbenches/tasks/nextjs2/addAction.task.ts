// #region Local Imports
import { ICommon, INextjs2Helper } from '../../../../typings';
import {
    getTemplate,
    createFile,
    addToIndex,
    writeFile
} from '../../operations';
import { nextjs2 } from '../../../../paths';
// #region Local Imports

export const addAction = (
    options: ICommon.IAnswers,
    params: INextjs2Helper.IAddActionParams
): void => {
    const {
        actionIndexTemplatePath,
        actionTemplatePath,
        actionTestTemplatePath
    } = params;
    const actionFolderDir = `${nextjs2.actionDir}/${options.fileName}Actions`;
    const actionFileDir = `${actionFolderDir}/index.ts`;
    const testFileDir = `${actionFolderDir}/index.spec.ts`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: actionFileDir,
        getFileContent: () => getTemplate(actionTemplatePath, options),
        message: 'Added new action file'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${nextjs2.actionDir}/index.ts`,
        getFileContent: () =>
            getTemplate(actionIndexTemplatePath, options),
        message: 'Added action file to index.ts Actions/index.ts'
    };

    const addTestParams: ICommon.IAddTest = {
        dirPath: testFileDir,
        getFileContent: () =>
            getTemplate(actionTestTemplatePath, options),
        message: 'Added action test'
    };

    createFile(actionFolderDir);
    addToIndex(addIndexParams);
    writeFile(writeFileProps);
    writeFile(addTestParams);
};
