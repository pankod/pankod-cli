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

export const addToIndex = (params: ICommon.IAddIndex): void => {
    const target = path.resolve('', params.dirPath);

    failsafe(target, true);

    const content = fs.readFileSync(target, 'utf-8');

    const clearToAppend = content.replace(/s$/, '');

    fs.writeFileSync(target, clearToAppend);

    fs.appendFileSync(target, `${params.getFileContent()}`);

    console.log(chalk.green(logSymbols.success, params.message));
};
