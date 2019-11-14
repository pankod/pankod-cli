import { Command } from '@oclif/command';

import { getQuestionByProjectType, choices } from '../../questions';
import { ICommon } from '../../Scripts/ICommon';
import inquirer = require('inquirer');
import { CommonHelper } from '../../Scripts/Common';
import { IQuestionsHelper } from '../../ITypes';

export default class Add extends Command {
    static description = 'Add services, components and more...';

    static args = [
        {
            name: 'element',
            options: Object.values(choices)
                .join()
                .split(',')
        }
    ];

    static usage = Object.values(choices)
        .join()
        .split(',')
        .map(element => `add ${element}`);

    validateProjectSupported = (projectType: string) => {
        if (!Object.keys(choices).includes(projectType)) {
            this.error(`The project ${projectType} isn't supported.`);
        }
    };

    validateCommand = (element: string, projectType: string) => {
        if (element && !choices[projectType].includes(element)) {
            this.error(`Command "${element}" isn't supported by ${projectType} project.`);
        }
    };

    async run() {
        const {
            args: { element }
        } = this.parse(Add);

        const { projectType } = CommonHelper.getPankodConfig();

        this.validateProjectSupported(projectType);
        this.validateCommand(element, projectType);

        let answers: ICommon.IAnswers = { fileName: '', fileType: '' };

        if (!element) {
            answers = await inquirer.prompt(getQuestionByProjectType(projectType));
        }

        const questionsHelper: IQuestionsHelper = require(`../../Scripts/${projectType}/index`) as IQuestionsHelper;
        
        try {
            const elementType = (answers.fileType || element).replace(' ', '');
            await questionsHelper.default.showQuestions(elementType);
        } catch (error) {
            this.error(error);
        }
    }
}
