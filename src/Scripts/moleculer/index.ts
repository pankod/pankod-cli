//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { Helper } from './helper';
//#endregion Local Imports

const questions = {
	entity: [
		{
			message: 'Enter entity name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				if (val.length) {
					if (
						CommonHelper.isAlreadyExist(
							Config.repositoriesDir,
							val,
							true
						)
					) {
						return 'Already added use new entity name';
					}

					return true;
				}

				return 'Cannot be empty';
			}
		}
	],
	service: [
		{
			message: 'Enter service name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				if (val.length) {
					if (
						Helper.isServiceAlreadyExist(
							Config.servicesDir,
							val
						)
					) {
						return 'Already added use new service name';
					}

					return true;
				}

				return 'Cannot be empty';
			}
		},
		{
			default: true,
			message: 'Is service open to outside?',
			name: 'isPrivate',
			type: 'confirm'
		},
		{
			default: true,
			message: 'Are you going to have a database connection?',
			name: 'hasDatabase',
			type: 'confirm'
		}
	]
};

const actions = {
	entity: answers => {
		Helper.createRepository(answers);
	},
	service: answers => {
		Helper.createService(answers);
	}
};

export default {
	showQuestions: async (type): Promise<void> => {
		const answers: ICommon.IAnswers = await inquirer.prompt<{ fileName: string }>(questions[type]);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

		actions[type](answers);
	}
};
