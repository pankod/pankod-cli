//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { INextjsActions, INextjsCommonQuestions, INextjsQuestions } from './INextjsTypes';
import { Helper } from './helper';
//#endregion Local Imports

const commonQuestions: INextjsCommonQuestions = {
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
			return CommonHelper.validate(val, Config.nextjs.componentsDir, false, 'component');
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
		when: ({ isConnectStore = false }: { isConnectStore?: boolean }): boolean => isConnectStore
	}
};

const questions: INextjsQuestions = {
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
				return CommonHelper.validate(val, Config.nextjs.pagesDir, false, 'page');
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
			when: ({ isHavePath = false }: { isHavePath?: boolean }): boolean => isHavePath
		},

		commonQuestions.connectStore,
		commonQuestions.isHaveReducer,
		commonQuestions.addStyle
	]
};

const actions: INextjsActions = {
	class: async (answers: ICommon.IAnswers): Promise<void> => {
		const { isHaveStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createClassComponent(answers);

		if (isHaveStyle) {
			Helper.createStyle(answers);
		}
	},
	functional: async (answers: ICommon.IAnswers): Promise<void> => {
		const { isHaveStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createFuncComponent(answers);

		if (isHaveStyle) {
			Helper.createStyle(answers);
		}
	},
	page: async (answers: ICommon.IAnswers): Promise<void> => {
		const { isHaveStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
		answers.isPage = true;
		Helper.createClassComponent(answers);
		Helper.addRoute(answers);

		if (isHaveStyle) {
			Helper.createStyle(answers);
		}
	}
};

export default {
	showQuestions: async (type: string): Promise<void> => {
		const componentType = type.split(' ')[0].toLowerCase();

		const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(questions[componentType]);

		actions[componentType](answers);
	}
};
