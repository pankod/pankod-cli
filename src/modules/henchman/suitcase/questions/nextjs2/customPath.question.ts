import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';

export const customPath: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: 'Do you want to add custom route or use default route name?',
    name: 'hasPath',
    type: 'list',
    default: false,
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
    ]
};

export const enterRouteName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter route name',
    name: 'routePath',
    type: 'input',
    when: ({ hasPath = false }): boolean => hasPath
};
