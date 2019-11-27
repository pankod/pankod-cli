// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
import * as logSymbols from 'log-symbols';
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../typings';
import { failsafe } from '.';
import { replaceContent } from './replaceContent.operation';
// #endregion Local Imports

export const writeFile = (
    params: ICommon.IWriteFile,
    replaceTarget?: RegExp
) => {
    const { dirPath, getFileContent, message } = params;

    const target = path.resolve('', dirPath);

    if (fs.existsSync(target) && replaceTarget) {
        const content = fs.readFileSync(target, 'utf8');

        params.getFileContent = () => {
            return content.replace(replaceTarget, getFileContent());
        };
    }

    failsafe(target);

    fs.writeFileSync(target, params.getFileContent());

    console.info(chalk.green(logSymbols.success, message));
};
