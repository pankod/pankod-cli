// #region Local Imports
import { getTemplate, writeFile, addToIndex } from '../../operations';
import { ICommon, IMoleculerHelper } from '../../../../typings';
import { moleculer } from '../../../../paths';
// #endregion Local Imports

export const createEntityInstance = (
    answers: ICommon.IAnswers,
    createEntityHelperParams: IMoleculerHelper.ICreateEntityHelperParams
) => {
    const templateProps = { fileName: answers.fileName };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.entityDir}/${answers.fileName}.ts`,
        getFileContent: () =>
            getTemplate(createEntityHelperParams.templatePath, templateProps),
        message: 'Added new Entity Instance.'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.entityDir}/index.ts`,
        getFileContent: () =>
            getTemplate(createEntityHelperParams.indexTemplate, templateProps),
        message: 'Entity added to index.ts.'
    };

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
};
