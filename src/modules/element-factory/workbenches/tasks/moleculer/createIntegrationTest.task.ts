// #region Local Imports
import { getTemplate, writeFile } from '../../operations';
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const createIntegrationTest = (options: ICommon.ICreateTest): void => {
    const integrationProps: ICommon.IWriteFile = {
        dirPath: options.dirPath,
        getFileContent: () =>
            getTemplate(options.templatePath, options.templateProps),
        message: options.successMessage
    };

    writeFile(integrationProps);
};
