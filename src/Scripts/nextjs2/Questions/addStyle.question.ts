import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';

export const addStyle: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: 'What kind of css do you want to implement?',
    name: 'hasStyle',
    type: 'list',
    default: 'noStyle',
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
            value: 'noStyle'
        }
    ]
};
