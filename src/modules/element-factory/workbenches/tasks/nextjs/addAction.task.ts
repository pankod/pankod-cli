// #region Local Imports
import { ICommon } from '../../../../typings';
import { nextjs } from '../../../../paths';
import { getTemplate, addToIndex, writeFile } from '../../operations';
import { INextjsHelper } from '../../../../typings';
// #endregion Local Imports

export const addAction = (
    answers: ICommon.IAnswers,
    params: INextjsHelper.IAddActionParams
): void => {
    const { actionIndexTemplatePath, actionTemplatePath } = params;

    const { fileName } = answers;

    const actionFileDir = `${nextjs.actionDir}/${fileName}Actions.ts`;

    const templateProps = { fileName };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: actionFileDir,
        getFileContent: () => getTemplate(actionTemplatePath, templateProps),
        message: 'Added new action file'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${nextjs.actionDir}/index.ts`,
        getFileContent: () =>
            getTemplate(actionIndexTemplatePath, templateProps),
        message: 'Added action file to index.ts Actions/index.ts'
    };

    addToIndex(addIndexParams);
    writeFile(writeFileProps);
};
