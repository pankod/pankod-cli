#!/usr/bin/env node

import * as chalk from 'chalk';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';

import { modelQuestion } from './helper_scripts/Definitions/Entity';
import { serviceQuestion } from './helper_scripts/Definitions/Service';

const project = process.argv.slice(3)[0].split('=')[1];

const text = {
	moleculer: 'microservice-cli'
};

console.clear();

console.log(
	chalk.default(
		figlet.textSync(text[project])
	)
);

const questions = {
	moleculer: [
		{
			choices: ['Entity', 'Service'],
			message: 'What would you like to add?',
			name: 'fileType',
			type: 'list'
		}
	]
};

program
	.action(async () => {
		const answers: { fileType: string } = await inquirer.prompt(questions[project]);

		switch (answers.fileType) {
			case 'Entity':
				await modelQuestion.showQuestions();
				break;
			case 'Service':
				await serviceQuestion.showQuestions();
				break;
			default:
				break;
		}
	});

program.parse(process.argv);
