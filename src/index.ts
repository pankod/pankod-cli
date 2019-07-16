#!/usr/bin/env node

import * as chalk from 'chalk';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as fs from 'fs';
import * as inquirer from 'inquirer';

let projectPath: string;

try {
	projectPath = JSON.parse(String(fs.readFileSync('./package.json'))).cli.projectType;
} catch {
	console.error('Please specify cli.projectType in package.json');

	process.exit(1);
}

const text = {
	moleculer: 'microservice-cli'
};

console.clear();

console.log(
	chalk.default(
		figlet.textSync(text[projectPath])
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
		const answers: { fileType: string } = await inquirer.prompt(questions[projectPath]);

		const questionsHelper = require(`./Scripts/${projectPath}/index`);

		questionsHelper.default.showQuestions(answers.fileType.toLowerCase());
	});

program.parse(process.argv);
