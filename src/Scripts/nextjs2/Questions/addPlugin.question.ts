import * as inquirer from 'inquirer';
import { Plugins } from '../pluginsEnum';
import { ICommon } from '../../ICommon';

export const addPlugin: inquirer.ListQuestion<ICommon.IAnswers> = {
    message: 'What plugin do you want to add?',
    name: 'pluginType',
    type: 'list',
    default: Plugins.styled,
    choices: [
        new inquirer.Separator(),
        {
            name: 'Styled Components',
            value: Plugins.styled
        },
        {
            name: 'Sass',
            value: Plugins.sass
        }
    ],
};
