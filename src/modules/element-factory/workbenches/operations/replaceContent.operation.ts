// #region Local Imports
import * as operations from '.';
// #endregion Local Imports

export const replaceContent = (params: ICommon.IReplaceContent): void => {
    const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: params.fileDir,
        getFileContent: () => replaceFile,
        message: params.message
    };

    operations.writeFile(writeFileProps);
};
