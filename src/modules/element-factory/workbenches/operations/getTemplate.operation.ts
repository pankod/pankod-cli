// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../typings';
// #endregion Local Imports

export const getTemplate = (
    templatePath: string,
    templateProps: ICommon.ITemplateProps
): string => {
    // __dirname + ../../ path is root of the lib folder.
    return mustache.render(
        fs.readFileSync(path.resolve(__dirname, '../../', templatePath), 'utf8'),
        templateProps
    );
};
