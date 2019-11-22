// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
import * as logSymbols from 'log-symbols';
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../typings';
import { failsafe } from '.';
// #endregion Local Imports

export const writeFile = (params: ICommon.IWriteFile) => {
    failsafe(params.dirPath);

    fs.writeFileSync(path.resolve('', params.dirPath), params.getFileContent());

    console.info(chalk.green(logSymbols.success, params.message));
};
