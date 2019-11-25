// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../typings';
// #endregion Local Imports

const { red, bold } = chalk;

export const getTemplate = (
    templatePath: string,
    templateProps: ICommon.ITemplateProps
): string => {
    // * __dirname + ../../../../../ path is root of project.
    const pathToTemplate = path.resolve(__dirname, '../../../../../', templatePath);

    if (!fs.existsSync(pathToTemplate)) {
        throw red(
            `Could NOT find the template with given path ${bold(
                pathToTemplate
            )}`
        );
    }

    return mustache.render(
        fs.readFileSync(pathToTemplate, 'utf8'),
        templateProps
    );
};
