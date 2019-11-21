// #region Local Imports
import { ICommon } from '../../../../typings';
import { getTemplate, writeFile } from '../../operations';
import { createStyleParams } from '../../params';
// #endregion Local Imports

export const createTest = (options: any): void => {
    const { templatePath } = createStyleParams;
    const { dirPath, templateProps, successMessage } = options;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: dirPath,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: successMessage
    };

    writeFile(writeFileProps);
};
