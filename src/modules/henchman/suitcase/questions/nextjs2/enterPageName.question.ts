// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { Config } from '../../../../config';
import { ICommon } from '../../../../typings';
import { validate } from '../../../../element-factory/workbenches/operations';
// #endregion Local Imports

export const enterPageName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter page name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return validate(val, Config.nextjs2.pagesDir, false, 'page');
    }
};
