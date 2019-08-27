//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { ICommon } from '../ICommon';
import { CommonHelper } from '../Common';
import { Helper } from './helper';
import { ISvelteActions, ISvelteQuestions, ISvelteHelper } from './ISvelteTypes';
//#endregion Local Imports


const questions: ISvelteQuestions = {
	Component: [
		{
			message: 'Enter component name',
			name: 'fileName',
			type: 'input',
			validate(val: string): string | boolean {
				return CommonHelper.validate(val, Config.svelte.componentsDir, false, 'component');
			}
		},
		{
			default: true,
			message: 'Do you want to add style file?',
			name: 'hasStyle',
			type: 'confirm'
		},
	]
};

const createComponentParams: ISvelteHelper.ICreateComponentParams = {
	templatePath: Config.svelte.templates.componentTemplate,
	componentsDir: Config.svelte.componentsDir
};

const createStyleParams: ISvelteHelper.ICreateStyle = {
	compDirPath: Config.svelte.componentsDir,
	templatePath: Config.svelte.templates.stylePageTemplate
};


const actions: ISvelteActions = {

	Component: async (answers: ICommon.IAnswers): Promise<void> => {
		const { hasStyle = false, lowerFileName, fileName } = answers;
		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

		const templateProps = {
			fileName,
			hasStyle,
			lowerFileName
		};

		const createTestParams = {
			answers,
			dirPath: `${Config.svelte.componentsDir}/${answers.fileName}/index.spec.js`,
			successMessage: 'Added new component test.',
			templatePath: Config.svelte.templates.componentTestTemplate,
			templateProps
		};

		Helper.createComponent(answers, createComponentParams);
		Helper.createTest(createTestParams);

		if (hasStyle) {
			Helper.createStyle(answers, createStyleParams);
		}
	}

};

export default {
	showQuestions: async (type: string): Promise<void> => {
		const componentType = type.replace(' ', '');

		const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(
			questions[componentType]
		);

		actions[componentType](answers);
	}
};
