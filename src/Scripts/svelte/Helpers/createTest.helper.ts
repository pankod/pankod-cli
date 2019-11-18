// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createStyleParams } from '../svelte.config';
// #endregion Local Imports

export const createTest = (options: any): void => {
    const { templatePath } = createStyleParams;
    const { dirPath, templateProps, successMessage } = options;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: dirPath,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: successMessage
    };

    CommonHelper.writeFile(writeFileProps);
};
