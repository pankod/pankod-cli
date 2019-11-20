// #region Local Imports
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
// #endregion Local Imports

export const createIntegrationTest = (options: ICommon.ICreateTest): void => {
    const integrationProps: ICommon.IWriteFile = {
        dirPath: options.dirPath,
        getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
        message: options.successMessage
    };

    CommonHelper.writeFile(integrationProps);
};
