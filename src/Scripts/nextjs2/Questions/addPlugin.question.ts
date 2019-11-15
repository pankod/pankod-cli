import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';

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
