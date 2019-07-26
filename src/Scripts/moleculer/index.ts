import { create } from 'istanbul-reports';
//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { IMoleculerActions, IMoleculerHelper, IMoleculerQuestions } from './IMoleculerTypes';
import { Helper } from './helper';
//#endregion Local Imports

const questions: IMoleculerQuestions = {
	entity: [
		{
			message: 'Enter entity name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				return CommonHelper.validate(val, Config.moleculer.repositoriesDir, true, 'entity');

			}
		}
	],
	service: [
		{
			message: 'Enter service name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				return CommonHelper.validate(val, Config.moleculer.servicesDir, true, 'service');
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

const actions: IMoleculerActions = {
	entity: (answers: ICommon.IAnswers) => {
		const crateInterfaceParams: IMoleculerHelper.ICreateInterfaceParams = {
			folderIndexTemplate: Config.moleculer.templates.createInterfaceFolderIndexTemplate,
			indexInterfaceTemplate: Config.moleculer.templates.createInterfaceIndexInterfaceTemplate,
			templatePath: Config.moleculer.templates.createInterfaceTemplatePath

		}
		Helper.createRepository(answers, crateInterfaceParams);
	},
	service: (answers: ICommon.IAnswers) => {

		const createServiceParams: IMoleculerHelper.ICreateServiceParams = {
			indexTemplate: Config.moleculer.templates.createServiceIndexTemplate,
			integrationTemplatePath: Config.moleculer.templates.createServiceIntegrationTestTemplate,
			templatePath: Config.moleculer.templates.createServiceTemplatePath,
			testTemplatePath: Config.moleculer.templates.createServiceTestTemplate,
			brokerHelperTemplatesParams: {
				brokerHelperCreate: Config.moleculer.templates.brokerHelperCreate,
				brokerHelperImport: Config.moleculer.templates.brokerHelperImport,
				replaceFileDir: Config.moleculer.brokerHelper
			},
			createServiceHelperParams: {
				indexTemplate: Config.moleculer.templates.createServiceHelperIndexTemplate,
				templatePath: Config.moleculer.templates.createServiceHelperTemplatePath,
				testTemplatePath: Config.moleculer.templates.createServiceHelperTestTemplatePath
			},
			createInterfaceParams: {
				folderIndexTemplate: Config.moleculer.templates.createInterfaceFolderIndexTemplate,
				indexInterfaceTemplate: Config.moleculer.templates.createInterfaceIndexInterfaceTemplate,
				templatePath: Config.moleculer.templates.createInterfaceTemplatePath

			}
		};
		Helper.createService(answers, createServiceParams);
	}
};

export default {
	showQuestions: async (type: string): Promise<void> => {
		const lowerCaseType = type.toLowerCase();
		const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(questions[lowerCaseType]);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

		actions[lowerCaseType](answers);
	}
};
