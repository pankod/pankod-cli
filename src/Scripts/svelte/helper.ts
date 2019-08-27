//#region Global Imports

//#endregion Global Imports

//#region Local Imports
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { ISvelteHelper } from './ISvelteTypes';
//#endregion Local Imports

export const Helper = {

	createStyle: (answers: ICommon.IAnswers, createStyleParams: ISvelteHelper.ICreateStyle): void => {
		const { fileName, lowerFileName } = answers;

		const templateProps = { fileName, lowerFileName };
		const compDirPath = `${createStyleParams.compDirPath}/${answers.fileName}/style.scss`;

		const writeFileProps = {
			dirPath: compDirPath,
			getFileContent: () => CommonHelper.getTemplate(createStyleParams.templatePath, templateProps),
			message: 'Added new style file'
		};

		CommonHelper.writeFile(writeFileProps);
	},

	createComponent: (
		answers: ICommon.IAnswers,
		params: ISvelteHelper.ICreateComponentParams
	): void => {
		const { lowerFileName, fileName, hasStyle } = answers;
		const componentDir = `${params.componentsDir}/${answers.fileName}`;
		const templateProps = {
			fileName,
			hasStyle,
			lowerFileName
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${componentDir}/index.svelte`,
			getFileContent: () => CommonHelper.getTemplate(params.templatePath, templateProps),
			message: 'Add new component.'
		};

		CommonHelper.createFile(componentDir);
		CommonHelper.writeFile(writeFileProps);
	}, 

	createTest: (options: ICommon.ICreateTest): void => {
		const writeFileProps: ICommon.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () =>
				CommonHelper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		CommonHelper.writeFile(writeFileProps);
	}
};
