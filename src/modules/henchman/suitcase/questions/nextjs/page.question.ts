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
        return validate(val, Config.nextjs.pagesDir, false, 'page');
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
