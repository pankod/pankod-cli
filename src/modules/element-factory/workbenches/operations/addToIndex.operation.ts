// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
import * as logSymbols from 'log-symbols';
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../typings';
// #endregion Local Imports

export const addToIndex = (params: ICommon.IAddIndex): void => {
    fs.appendFileSync(
        path.resolve('', params.dirPath),
        `${params.getFileContent()}`
    );

    console.log(chalk.green(logSymbols.success, params.message));
};
