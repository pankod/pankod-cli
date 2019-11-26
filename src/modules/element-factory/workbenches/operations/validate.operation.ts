// #region Global Imports
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { isAlreadyExist } from '.';
// #endregion Local Imports

const { red, bold } = chalk;

export const validate = (
    val: string,
    dirPath: string,
    isFile: boolean,
    fileType: string
): string | boolean => {
    if (val.length) {
        if (!val.match(/^[^\W_]+$/gi)) {
            return red('Special characters and spaces are NOT allowed!');
        } else if (isAlreadyExist(dirPath, val, isFile, fileType)) {
            return red(
                `This ${bold(
                    fileType
                )} name already used before, enter new name.`
            );
        }

        return true;
    }

    return red('Can NOT be empty!');
};
