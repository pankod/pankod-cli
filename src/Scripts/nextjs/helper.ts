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


const createInterfaceParams = {
	templatePath: Config.nextjs.templates.createInterfaceTempPath,
	pageInterfaceIndex: Config.nextjs.templates.pageInterfaceIndex,
	storeImportInterface: Config.nextjs.templates.storeImportInterface,
	compInterfaceIndex: Config.nextjs.templates.compInterfaceIndex,
	storeInterface: Config.nextjs.templates.storeInterface,
	interfaceDir: Config.nextjs.interfaceDir,
	reduxInterfaceDir: Config.nextjs.reduxInterfaceDir,
	pageInterfaceDir: Config.nextjs.pageInterfaceDir,
	compInterfaceDir: Config.nextjs.compInterfaceDir
};

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

		const replaceStoreParams: ICommon.IReplaceContent = {
			fileDir: createInterfaceParams.reduxInterfaceDir,
			filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.reduxInterfaceDir), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(createInterfaceParams.storeInterface, templateProps),
			message: 'Interface file added to Interfaces/Redux/Store.d.ts',
			regexKey: /export interface IStore\s[{]/g
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		if (isConnectStore) {
			CommonHelper.replaceContent(replaceStoreParams);

			setTimeout(
				() => {
					const replaceStoreImportParams: ICommon.IReplaceContent = {
						fileDir: createInterfaceParams.reduxInterfaceDir,
						filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.reduxInterfaceDir), 'utf8'),
						getFileContent: () => CommonHelper.getTemplate(createInterfaceParams.storeImportInterface, templateProps),
						message: 'Interface file added to import section in Interfaces/Redux/Store.d.ts',
						regexKey: /\s[}] from '@Interfaces';/g
					};
					CommonHelper.replaceContent(replaceStoreImportParams);
				},
				500
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

	addActionConstIndex: (templateProps: ICommon.ITemplateProps): void => {
		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.definitionsDir}/ActionConsts.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.definitionsDir}/ActionConsts.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/ActionConst.mustache', templateProps),
			message: 'Action constants added to Definitions/ActionConsts.ts',
			regexKey: /export const ActionConsts\s[=]\s[{]/g
		};

		CommonHelper.replaceContent(replaceContentParams);
	},

	addAction: (answers: ICommon.IAnswers): void => {
		const { fileName } = answers;
		const actionFileDir = `${Config.nextjs.actionDir}/${fileName}Actions.ts`;
		const actionTemplate = './dist/Templates/nextjs/Reducers/Action.mustache';
		const indexTemplate = './dist/Templates/nextjs/Reducers/ActionIndex.mustache';
		const templateProps = { fileName };

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: actionFileDir,
			getFileContent: () => CommonHelper.getTemplate(actionTemplate, templateProps),
			message: 'Added new action file'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.nextjs.actionDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Added action file to index.ts Actions/index.ts'
		};

		CommonHelper.addToIndex(addIndexParams);
		CommonHelper.writeFile(writeFileProps);
	},

	addReducer: (answers: ICommon.IAnswers): void => {
		const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;

		const reducerFileDir = `${Config.nextjs.reducerDir}/${lowerFileName}.ts`;
		const reducerTemplate = './dist/Templates/nextjs/Reducers/Reducer.mustache';
		const templateProps = { fileName, lowerFileName, upperFileName };
		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.reducerDir}/index.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/index.mustache', templateProps),
			message: 'Reducer added to Redux/Reducers/index.ts',
			regexKey: /import { combineReducers } from 'redux';/g
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: reducerFileDir,
			getFileContent: () => CommonHelper.getTemplate(reducerTemplate, templateProps),
			message: 'Added new reducer file'
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		setTimeout(
			() => {
				const replaceReducerContentParams: ICommon.IReplaceContent = {
					fileDir: `${Config.nextjs.reducerDir}/index.ts`,
					filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
					getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/Store.mustache', templateProps),
					message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
					regexKey: /export default combineReducers[(][{]/g
				};
				CommonHelper.replaceContent(replaceReducerContentParams);
			},
			1500
		);

		if (isConnectStore) {
			Helper.addActionConstIndex(templateProps);
		}
	},

	createClassComponent: (answers: ICommon.IAnswers, params: INextjsHelper.ICreateClassComponentParams): void => {
		const { templatePath, indexTemplatePath } = params
		const { lowerFileName, isConnectStore = false, isPage = false } = answers;
		const pagesDir = `${Config.nextjs.pagesDir}/${lowerFileName}`;
		const classDir = isPage ? pagesDir : `${Config.nextjs.componentsDir}/${answers.fileName}`;
		// const templatePath = './dist/Templates/nextjs/Components/Class.mustache';
		const templateProps = {
			fileName: answers.fileName,
			hasStyle: answers.hasStyle,
			interfaceName: `I${answers.fileName}`,
			isConnectStore: answers.isConnectStore,
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};
		// const indexTemplate = './dist/Templates/nextjs/Components/index.mustache';

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
			Helper.addReducer(templateProps);
			Helper.addAction(templateProps);
		}

		if (!isPage) {
			CommonHelper.addToIndex(addIndexParams);
		}
	},

	createFuncComponent: (answers: ICommon.IAnswers, ICreateFuncComponentParams:INextjsHelper.ICreateFuncComponentParams): void => {
		const { lowerFileName, fileName, hasStyle } = answers;
		const funcDir = `${Config.nextjs.componentsDir}/${answers.fileName}`;
	/* 	const templatePath = './dist/Templates/nextjs/Components/Functional.mustache'; */
		const templateProps = {
			fileName,
			hasStyle,
			interfaceName: `I${fileName}`,
			lowerFileName
		};
		const indexTemplate = './dist/Templates/nextjs/Components/index.mustache';

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.nextjs.componentsDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Component added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${funcDir}/index.tsx`,
			getFileContent: () => CommonHelper.getTemplate(ICreateFuncComponentParams.templatePath, templateProps),
			message: 'Add new functional component.'
		};

		CommonHelper.createFile(funcDir);
		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createInterface(answers, false, createInterfaceParams);
	}
};
