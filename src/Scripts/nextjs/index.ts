//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { PluginHelper } from '../../Plugins/nextjs/helpers';
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { INextjsActions, INextjsCommonQuestions, INextjsQuestions } from './INextjsTypes';
import { Helper } from './helper';
import { Plugins } from './pluginsEnum';
//#endregion Local Imports

const commonQuestions: INextjsCommonQuestions = {
	addStyle: {
		default: true,
		message: 'Do you want to add style file?',
		name: 'hasStyle',
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

	ClassComponent: [
		commonQuestions.enterComponentName,
		commonQuestions.connectStore,
		commonQuestions.isHaveReducer,
		commonQuestions.addStyle
	],
	FunctionalComponent: [
		commonQuestions.enterComponentName,
		commonQuestions.addStyle
	],
	Page: [
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
			name: 'hasPath',
			type: 'list'
		},
		{
			message: 'Enter route name',
			name: 'routePath',
			type: 'input',
			when: ({ hasPath = false }: { hasPath?: boolean }): boolean => hasPath
		},

		commonQuestions.connectStore,
		commonQuestions.isHaveReducer,
		commonQuestions.addStyle
	],
	Plugin: [
		{
			choices: [
				new inquirer.Separator(),
				{
					name: 'Styled Components',
					value: Plugins.styled
				},
				{
					name: 'Sass',
					value: Plugins.sass
				}
			],
			message: 'What plugin do you want to add?',
			name: 'pluginType',
			type: 'list'
		}
	]
};

const actions: INextjsActions = {
	ClassComponent: async (answers: ICommon.IAnswers): Promise<void> => {
		const { hasStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createClassComponent(answers);

		if (hasStyle) {
			Helper.createStyle(answers);
		}
	},
	FunctionalComponent: async (answers: ICommon.IAnswers): Promise<void> => {
		const { hasStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		Helper.createFuncComponent(answers);

		if (hasStyle) {
			Helper.createStyle(answers);
		}
	},
	Page: async (answers: ICommon.IAnswers): Promise<void> => {
		const { hasStyle = false } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
		answers.isPage = true;
		
		const addRouteParams = {
			routesDir: Config.nextjs.routesDir,
			routesTemplate: Config.nextjs.templates.addRouteTemplate
		};

		Helper.createClassComponent(answers);
		Helper.addRoute(answers, addRouteParams);

		if (hasStyle) {
			Helper.createStyle(answers);
		}
	},
	Plugin: async (answers: ICommon.IAnswers): Promise<void> => {
		const { pluginType = Plugins.styled } = answers;

		PluginHelper[pluginType]();
	}
};

export default {
	showQuestions: async (type: string): Promise<void> => {
		const componentType = type.replace(' ', '');

		const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(questions[componentType]);

		actions[componentType](answers);
	}
};
