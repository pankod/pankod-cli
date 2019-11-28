// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const implementation: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: `What's your preferred implementation?`,
    name: 'implementation',
    type: 'list',
    default: 'functional',
    choices: [
        new inquirer.Separator(),
        {
            name: 'Functional',
            value: 'functional'
        },
        {
            name: 'Object Oriented',
            value: 'object-oriented'
        }
    ]
};
