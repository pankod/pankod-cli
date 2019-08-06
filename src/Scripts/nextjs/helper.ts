//#region Global Imports
import * as fs from 'fs';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { INextjsHelper } from './INextjsTypes';
//#endregion Local Imports

export const Helper = {

	addRoute: (answers: ICommon.IAnswers, IAddRoutesReplaceParams: INextjsHelper.IAddRoutesReplaceParams) => {
		const { hasPath = false, routePath, fileName } = answers;

		const templateProps = {
			fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
			hasPath,
			routePath
		};

		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: IAddRoutesReplaceParams.routesDir,
			filetoUpdate: fs.readFileSync(path.resolve('', IAddRoutesReplaceParams.routesDir), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
			message: `Route added to routes.js as ${hasPath ? `'/${routePath}'` : `'/${fileName}/index'`}`,
			regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm
		};

		CommonHelper.replaceContent(replaceContentParams);
	},
	createInterface: (answers: ICommon.IAnswers, isClass: boolean, createInterfaceParams: INextjsHelper.ICreateInterfaceParams) => {
		const { fileName, lowerFileName, isPage = false, isConnectStore = false, upperFileName } = answers;
		const templateProps = { fileName, isClass, lowerFileName, isConnectStore, upperFileName };

		const pageDirPath = `${createInterfaceParams.pageInterfaceDir}/${fileName}.d.ts`;
		const compDirPath = `${createInterfaceParams.compInterfaceDir}/${fileName}.d.ts`;

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: isPage ? pageDirPath : compDirPath,
			getFileContent: () => CommonHelper.getTemplate(createInterfaceParams.templatePath, templateProps),
			message: 'Added new interface file'
		};

		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: createInterfaceParams.interfaceDir,
			filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.interfaceDir), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(isPage ? createInterfaceParams.pageInterfaceIndex : createInterfaceParams.compInterfaceIndex, templateProps),
			message: 'Interface file added to Interfaces/index.ts',
			regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
		};

		const commonReplaceParams = (contentFile: string, message: string, regexKey: RegExp) => ({
			fileDir: createInterfaceParams.reduxInterfaceDir,
			filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.reduxInterfaceDir), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(contentFile, templateProps),
			message,
			regexKey
		});

		const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
			createInterfaceParams.storeInterface,
			'Interface file added to Interfaces/Redux/Store.d.ts',
			/export interface IStore\s[{]/g
		);

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		if (isConnectStore) {
			CommonHelper.replaceContent(replaceStoreParams);

			setTimeout(
				() => {
					const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
						createInterfaceParams.storeImportInterface,
						'Interface file added to import section in Interfaces/Redux/Store.d.ts',
						/\s[}] from '@Interfaces';/g
					);

					CommonHelper.replaceContent(replaceStoreImportParams);
				},
				100
			);

		}
	},

	createStyle: (answers: ICommon.IAnswers, createStyleParams: INextjsHelper.ICreateStyle): void => {
		const { fileName, isPage = false, lowerFileName } = answers;

		const templateProps = { fileName, lowerFileName };
		const pageDirPath = `${createStyleParams.pageDirPath}/${answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase())}/style.scss`;
		const compDirPath = `${createStyleParams.compDirPath}/${answers.fileName}/style.scss`;

		const writeFileProps = {
			dirPath: isPage ? pageDirPath : compDirPath,
			getFileContent: () => CommonHelper.getTemplate(createStyleParams.templatePath, templateProps),
			message: 'Added new style file'
		};

		CommonHelper.writeFile(writeFileProps);
	},

	addActionConstIndex: (templateProps: ICommon.ITemplateProps, params: INextjsHelper.IAddActionConstIndexParams): void => {
		const { actionConstTemplatePath } = params;

		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.definitionsDir}/ActionConsts.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.definitionsDir}/ActionConsts.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(actionConstTemplatePath, templateProps),
			message: 'Action constants added to Definitions/ActionConsts.ts',
			regexKey: /export const ActionConsts\s[=]\s[{]/g
		};

		CommonHelper.replaceContent(replaceContentParams);
	},

	addAction: (answers: ICommon.IAnswers, params: INextjsHelper.IAddActionParams): void => {
		const { actionIndexTemplatePath, actionTemplatePath } = params;
		const { fileName } = answers;
		const actionFileDir = `${Config.nextjs.actionDir}/${fileName}Actions.ts`;
		const templateProps = { fileName };

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: actionFileDir,
			getFileContent: () => CommonHelper.getTemplate(actionTemplatePath, templateProps),
			message: 'Added new action file'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.nextjs.actionDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(actionIndexTemplatePath, templateProps),
			message: 'Added action file to index.ts Actions/index.ts'
		};

		CommonHelper.addToIndex(addIndexParams);
		CommonHelper.writeFile(writeFileProps);
	},

	addReducer: (answers: ICommon.IAnswers, params: INextjsHelper.IAddReducerParams): void => {
		const { reducerIndexTemplatePath, reducerTemplatePath, addActionConstIndexParams, reducerStoreTemplatePath } = params;
		const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;

		const reducerFileDir = `${Config.nextjs.reducerDir}/${lowerFileName}.ts`;
		const templateProps = { fileName, lowerFileName, upperFileName };
		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.reducerDir}/index.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(reducerIndexTemplatePath, templateProps),
			message: 'Reducer added to Redux/Reducers/index.ts',
			regexKey: /import { combineReducers } from 'redux';/g
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: reducerFileDir,
			getFileContent: () => CommonHelper.getTemplate(reducerTemplatePath, templateProps),
			message: 'Added new reducer file'
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		setTimeout(
			() => {
				const replaceReducerContentParams: ICommon.IReplaceContent = {
					fileDir: `${Config.nextjs.reducerDir}/index.ts`,
					filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
					getFileContent: () => CommonHelper.getTemplate(reducerStoreTemplatePath, templateProps),
					message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
					regexKey: /export default combineReducers[(][{]/g
				};
				CommonHelper.replaceContent(replaceReducerContentParams);
			},
			100
		);

		if (isConnectStore) {
			Helper.addActionConstIndex(templateProps, addActionConstIndexParams);
		}
	},

	createClassComponent: (answers: ICommon.IAnswers, params: INextjsHelper.ICreateClassComponentParams): void => {
		const { templatePath, indexTemplatePath, createInterfaceParams, addReducerParams, addActionParams } = params;
		const { lowerFileName, isConnectStore = false, isPage = false } = answers;
		const pagesDir = `${Config.nextjs.pagesDir}/${lowerFileName}`;
		const classDir = isPage ? pagesDir : `${Config.nextjs.componentsDir}/${answers.fileName}`;
		const templateProps = {
			fileName: answers.fileName,
			hasStyle: answers.hasStyle,
			interfaceName: `I${answers.fileName}`,
			isConnectStore: answers.isConnectStore,
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.nextjs.componentsDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplatePath, templateProps),
			message: 'Component added to index.ts'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${classDir}/index.tsx`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new class component'
		};

		CommonHelper.createFile(classDir);
		CommonHelper.writeFile(writeFileProps);
		Helper.createInterface(answers, true, createInterfaceParams);

		if (isConnectStore) {
			Helper.addReducer(templateProps, addReducerParams);
			Helper.addAction(templateProps, addActionParams);
		}

		if (!isPage) {
			CommonHelper.addToIndex(addIndexParams);
		}
	},

	createFuncComponent: (answers: ICommon.IAnswers, params: INextjsHelper.ICreateFuncComponentParams): void => {
		const { lowerFileName, fileName, hasStyle } = answers;
		const funcDir = `${params.componentsDir}/${answers.fileName}`;
		const templateProps = {
			fileName,
			hasStyle,
			interfaceName: `I${fileName}`,
			lowerFileName
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${params.componentsDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(params.indexTemplatePath, templateProps),
			message: 'Component added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${funcDir}/index.tsx`,
			getFileContent: () => CommonHelper.getTemplate(params.templatePath, templateProps),
			message: 'Add new functional component.'
		};

		CommonHelper.createFile(funcDir);
		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createInterface(answers, false, params.createInterfaceParams);
	}
};
