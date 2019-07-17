#!/usr/bin/env node

import * as chalk from 'chalk';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as fs from 'fs';
import * as inquirer from 'inquirer';

import { IProjectType, IQuestions, IQuestionsHelper, IText } from './ITypes';
import { ICommon } from './Scripts/ICommon';

let projectPath: string;

try {
	const parsed: IProjectType = JSON.parse(String(fs.readFileSync('./package.json'))) as IProjectType;
	projectPath = parsed.cli.projectType;
} catch {
	projectPath = '';
	console.error('Please specify cli.projectType in package.json');

	process.exit(1);
}

const text: IText = {
	moleculer: 'microservice-cli',
	nextjs: 'Pankod NextJS CLI'
};

console.clear();

console.log(
	chalk.default(
		figlet.textSync(text[projectPath])
	)
);

const questions: IQuestions = {
	moleculer: {
		choices: ['Entity', 'Service'],
		message: 'What would you like to add?',
		name: 'fileType',
		type: 'list'
	},
	nextjs: {
		choices: ['Page', 'Functional Component', 'Class Component'],
		message: 'What do you want to add?',
		name: 'fileType',
		type: 'list'
	}
};

program
	.action(async () => {
		const answers: ICommon.IAnswers = await inquirer.prompt(questions[projectPath]);

		const questionsHelper: IQuestionsHelper = require(`./Scripts/${projectPath}/index`) as IQuestionsHelper;

		questionsHelper.default.showQuestions(answers.fileType);
	});

program.parse(process.argv);
