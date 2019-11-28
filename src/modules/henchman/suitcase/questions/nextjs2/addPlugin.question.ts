// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const addPlugin: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: 'What plugin do you want to add?',
    name: 'pluginType',
    type: 'list',
    default: 'styled',
    choices: [
        new inquirer.Separator(),
        {
            name: 'Styled Components',
            value: 'styled'
        },
        {
            name: 'Sass',
            value: 'sass'
        }
    ],
};
