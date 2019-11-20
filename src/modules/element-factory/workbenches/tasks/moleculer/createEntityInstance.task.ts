// #region Local Imports
import { CommonHelper } from '../../Common';
import { IMoleculerHelper } from '../IMoleculerTypes';
import { ICommon } from '../../ICommon';
import * as paths from '../../../../paths';
// #endregion Local Imports

export const createEntityInstance = (
    answers: ICommon.IAnswers,
    createEntityHelperParams: IMoleculerHelper.ICreateEntityHelperParams
) => {
    const templateProps = { fileName: answers.fileName };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${paths.moleculer.entityDir}/${answers.fileName}.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createEntityHelperParams.templatePath, templateProps),
        message: 'Added new Entity Instance.'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${paths.moleculer.entityDir}/index.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createEntityHelperParams.indexTemplate, templateProps),
        message: 'Entity added to index.ts.'
    };

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
};
