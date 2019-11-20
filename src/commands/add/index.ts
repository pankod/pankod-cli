// #region Global Imports
import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../modules/typings';
import { produce } from '../../modules/element-factory';
import { getQuestionByProject } from '../../modules/henchman';
import {
    getPankodConfig,
    validateCommand,
    validateProject,
    getAllElements,
    getUsage
} from '../../modules/utils';
// #endregion Local Imports

export default class Add extends Command {
    static description = 'Add services, components and more...';

    static args = [
        {
            name: 'element',
            options: getAllElements()
        }
    ];

    static usage = getUsage();

    async run() {
        const { project } = getPankodConfig();

        // ? bind(this) or pass this.error
        validateProject(project);

        let {
            args: { element }
        }: ICommon.IAddArgs = this.parse(Add);

        if (element) {
            // ? bind(this) or pass this.error
            validateCommand(element, project);
        } else {
            const whichElement = getQuestionByProject(project);

            element = await inquirer.prompt(whichElement);
        }

        await produce(project, element);
    }
}
