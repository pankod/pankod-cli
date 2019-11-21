// #region Local Imports
import { getTemplate, writeFile } from '../../operations';
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const createTest = (options: ICommon.ICreateTest): void => {
    const writeFileProps: ICommon.IWriteFile = {
        dirPath: options.dirPath,
        getFileContent: () =>
            getTemplate(options.templatePath, options.templateProps),
        message: options.successMessage
    };

    writeFile(writeFileProps);
};
