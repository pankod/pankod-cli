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
    const folders = params.dirPath.split('/');

    // * <Failsafe>
    folders.reduce((acc, curr) => {
        const target = path.join(...acc, curr);

        if (!fs.existsSync(target)) fs.mkdirSync(target);

        return [...acc, curr];
    }, ['.']);
    // * </Failsafe>

    fs.appendFileSync(
        path.resolve('', params.dirPath),
        `${params.getFileContent()}`
    );

    console.log(chalk.green(logSymbols.success, params.message));
};
