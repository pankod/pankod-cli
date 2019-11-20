// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const addStyle: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: 'What kind of css do you want to implement?',
    name: 'hasStyle',
    type: 'list',
    default: false,
    choices: [
        new inquirer.Separator(),
        {
            name: 'styled-components',
            value: 'styled'
        },
        {
            name: 'SCSS/SASS',
            value: 'scss'
        },
        {
            name: "I don't want to add style file.",
            value: false
        }
    ]
};
