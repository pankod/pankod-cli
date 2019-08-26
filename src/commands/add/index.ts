import { Command } from '@oclif/command';

import questions from '../../questions';
import { ICommon } from '../../Scripts/ICommon';
import inquirer = require('inquirer');
import { CommonHelper } from '../../Scripts/Common';
import { IQuestionsHelper, ISupportedCommands } from '../../ITypes';

interface IAddArgs {
	args: {
		entityType: string
	}
}

const supportedProjects: string[] = ['nextjs', 'moleculer', 'svelte'];

const supportedCommands: ISupportedCommands = {
	moleculer: ['Entity', 'Service'],
	nextjs: ['Page', 'FunctionalComponent', 'ClassComponent', 'Plugin'],
	svelte: ['Component']
};

export default class Add extends Command {
	static description = 'Add services, components and more...';

	static args = [
		{
			name: 'entityType',
			options: ['Entity', 'Service', 'Page', 'FunctionalComponent', 'ClassComponent', 'Plugin', 'Component']
		}
	];

	static usage =
		['add Entity', 'add Service', 'add Page', 'add FunctionalComponent', 'add ClassComponent', 'add Plugin'];

	validateProjectSupported = (projectType: string) => {
		if (!supportedProjects.includes(projectType)) {
			this.error(`The project ${projectType} isn't supported.`);
		}
	};

	validateCommand = (entityType: string, projectType: string) => {
		if (entityType && !supportedCommands[projectType].includes(entityType)) {
			this.error(`Command "${entityType}" isn't supported by ${projectType} project.`);
		}
	};

	async run() {
		const { args: { entityType } }: IAddArgs = this.parse(Add);

		const { projectType } = CommonHelper.getPankodConfig();

		this.validateProjectSupported(projectType);
		this.validateCommand(entityType, projectType);

		let answers: ICommon.IAnswers = { fileName: '', fileType: '' };

		if (!entityType) {
			answers = await inquirer.prompt(questions[projectType]);
		}

		const questionsHelper: IQuestionsHelper = require(`../../Scripts/${projectType}/index`) as IQuestionsHelper;

		try {
			await questionsHelper.default.showQuestions(answers.fileType || entityType);
		} catch (error) {
			this.error(error);
		}
	}
}
