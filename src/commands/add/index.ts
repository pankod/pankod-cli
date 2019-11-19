import { Command } from '@oclif/command';

import { getQuestionByProject, choices } from '../../questions';
import inquirer = require('inquirer');
import { CommonHelper } from '../../Scripts/Common';

export default class Add extends Command {
    static description = 'Add services, components and more...';

    static args = [
        {
            name: 'element',

            // TODO: use helper to keep clean
            options: Object.values(choices)
                .join()
                .split(',')
        }
    ];

    // TODO: use helper to keep clean
    static usage = Object.values(choices)
        .join()
        .split(',')
        .map(element => `add ${element}`);

    async run() {
        
        // TODO: Hurrah! to modules/helper
        const { project } = CommonHelper.getPankodConfig();
        
        // TODO: Validate Properly
        // ? bind(this) or pass this.error
        // validateProjectSupported(project);

        let {
            args: { element }
        } = this.parse(Add);

        if (element) {
            // TODO: Validate Properly
            // ? bind(this) or pass this.error
            // validateCommand(element, project);
        } else {
            const whichElement = getQuestionByProject(project);

            element = await inquirer.prompt(whichElement);
        }

        await elementFactory.produce(project, element);
    }
}
