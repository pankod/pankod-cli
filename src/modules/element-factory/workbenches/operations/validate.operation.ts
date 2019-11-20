// #region Local Imports
import * as operations from '.';
// #endregion Local Imports

export const validate = (
    val: string,
    dirPath: string,
    isFile: boolean,
    fileType: string
): string | boolean => {
    if (val.length) {
        if (operations.isAlreadyExist(dirPath, val, isFile, fileType)) {
            return `This ${fileType} name already used before, enter new name.`;
        }

        return true;
    }

    return 'Can not be empty';
};
