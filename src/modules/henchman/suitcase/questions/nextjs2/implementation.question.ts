// #region Global Imports
import * as inquirer from 'inquirer';
import chalk from 'chalk';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../../typings';
// #endregion Local Imports

const { italic } = chalk;

export const implementation: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: `What's your preferred implementation?`,
    name: 'implementation',
    type: 'list',
    default: 'functional',
    choices: [
        new inquirer.Separator(),
        {
            name: `const Awesome = () => { ... } - ${italic.grey(
                'Functional Component'
            )}`,
            value: 'functional'
        },
        {
            name: `class Awesome { ... } - ${italic.grey('Class Component')}`,
            value: 'object-oriented'
        }
    ]
};
