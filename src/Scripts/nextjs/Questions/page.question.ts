// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';
// #endregion Local Imports

export const enterPageName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter page name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.nextjs.pagesDir, false, 'page');
    }
};

export const customPath: inquirer.ListQuestion<ICommon.IAnswers> = {
    choices: [
        new inquirer.Separator(),
        {
            name: 'Yes, I want to add custom path?',
            value: true
        },
        {
            name: 'No, use default.',
            value: false
        }
    ],
    message: 'Do you want to add custom route or use default route name?',
    name: 'hasPath',
    type: 'list'
};

export const routeName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter route name',
    name: 'routePath',
    type: 'input',
    when: ({ hasPath = false }: { hasPath?: boolean }): boolean => hasPath
};
