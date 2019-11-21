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
        validateProject.bind(this, project)();

        let {
            args: { element }
        }: ICommon.IAddArgs = this.parse(Add);

        if (element) {
            // ? bind(this) or pass this.error
            validateCommand.bind(this, element, project)();
        } else {
            const whichElement = getQuestionByProject(project);

            const { selection } = await inquirer.prompt(whichElement);

            element = selection;
        }

        await produce(project, element);
    }
}
