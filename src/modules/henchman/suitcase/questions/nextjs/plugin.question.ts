import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';

export const plugin: inquirer.ListQuestion<ICommon.IAnswers> = {
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
    message: 'What plugin do you want to add?',
    name: 'pluginType',
    type: 'list'
};
