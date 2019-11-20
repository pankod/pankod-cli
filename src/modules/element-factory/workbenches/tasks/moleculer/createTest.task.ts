// #region Local Imports
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
// #endregion Local Imports

export const createTest = (options: ICommon.ICreateTest): void => {
    const writeFileProps: ICommon.IWriteFile = {
        dirPath: options.dirPath,
        getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
        message: options.successMessage
    };

    CommonHelper.writeFile(writeFileProps);
};
