//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { Helper } from './helper';
//#endregion Local Imports

const validate = (val: string, path: string): string | boolean => {
	if (val.length) {
		if (
			CommonHelper.isAlreadyExist(
				path,
				val
			)
		) {
			return 'This component name already used before, enter new name.';
		}

		return true;
	}

	return 'Can not be empty';
};

const commonQuestions = {
	addStyle: {
		default: true,
		message: 'Do you want to add style file?',
		name: 'isHaveStyle',
		type: 'confirm'
	},
	connectStore: {
		default: false,
		message: 'Do you want to connect store ?',
		name: 'isConnectStore',
		type: 'confirm'
	},
	enterComponentName: {
		message: 'Enter component name',
		name: 'fileName',
		type: 'input',
		validate(val: string): string | boolean {
			return validate(val, Config.nextjs.componentsDir);
		}
	},
	isHaveReducer: {
		choices: [
			new inquirer.Separator(),
			{
				name: 'Yes, I want to have new reducer.',
				value: true
			},
			{
				name: 'No, do not create a new reducer.',
				value: false
			}
		],
		message: 'Do you want to create a new reducer or use your own?',
		name: 'isHaveReducer',
		type: 'list',
		when: ({ isConnectStore }: { isConnectStore: boolean }): boolean => isConnectStore
	}
};

const questions = {
	class: [
		commonQuestions.enterComponentName,
		commonQuestions.connectStore,
		commonQuestions.isHaveReducer,
		commonQuestions.addStyle
	],
	functional: [
		commonQuestions.enterComponentName,
		commonQuestions.addStyle
	],
	page: [
		{
			message: 'Enter page name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				return validate(val, Config.nextjs.pagesDir);
			}
		},
		{
			choices: [
				new inquirer.Separator(),
				{
					name: 'Yes, I want to add custom path?',
					value: true
				},
				{
					name: 'No, use default.',
					value: false
				}
			],
			message: 'Do you want to add custom route or use default route name?',
			name: 'isHavePath',
			type: 'list'
		},
		{
			message: 'Enter route name',
			name: 'routePath',
			type: 'input',
			when: ({ isHavePath }: { isHavePath: boolean }): boolean => isHavePath
		},

		commonQuestions.connectStore,
		commonQuestions.isHaveReducer,
		commonQuestions.addStyle
	]
};

const actions = {
	class: async (answers: ICommon.IAnswers): Promise<void> => {
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createClassComponent(answers);

		if (answers.isHaveStyle) {
			Helper.createStyle(answers);
		}
	},
	functional: async (answers: ICommon.IAnswers): Promise<void> => {
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createFuncComponent(answers);

		if (answers.isHaveStyle) {
			Helper.createStyle(answers);
		}
	},
	page: async (answers: ICommon.IAnswers): Promise<void> => {
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
		answers.isPage = true;
		Helper.createClassComponent(answers);
		Helper.addRoute(answers);

		if (answers.isHaveStyle) {
			Helper.createStyle(answers);
		}
	}
};

export default {
	showQuestions: async (type): Promise<void> => {
		const componentType = type.split(' ')[0].toLowerCase();

		const answers: ICommon.IAnswers = await inquirer.prompt<{ fileName: string }>(questions[componentType]);

		actions[componentType](answers);
	}
};
