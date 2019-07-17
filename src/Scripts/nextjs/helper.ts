//#region Global Imports
import * as fs from 'fs';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
//#endregion Local Imports

export const Helper = {
	addRoute: (answers: ICommon.IAnswers) => {
		const { isHavePath, routePath, fileName } = answers;

		const templateProps = {
			fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
			isHavePath,
			routePath
		};

		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.routesDir}/routes.js`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.routesDir}/routes.js`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Routes.mustache', templateProps),
			message: `Route added to routes.js as ${isHavePath ? `'/${routePath}'` : `'/${fileName}/index'`}`,
			regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm
		};

		CommonHelper.replaceContent(replaceContentParams);
	},
	createInterface: (answers: ICommon.IAnswers, isClass: boolean) => {
		const { fileName, lowerFileName, isPage, isConnectStore, upperFileName } = answers;
		const templatePath = './dist/Templates/nextjs/Interfaces/Component.mustache';
		const templateProps = { fileName, isClass, lowerFileName, isConnectStore, upperFileName };
		const pageDirPath = `${Config.nextjs.pageInterfaceDir}/${fileName}.d.ts`;
		const compDirPath = `${Config.nextjs.compInterfaceDir}/${fileName}.d.ts`;
		const pageInterfaceIndex = './dist/Templates/nextjs/Interfaces/PageIndex.mustache';
		const compIntefaceIndex = './dist/Templates/nextjs/Interfaces/ComponentIndex.mustache';
		const storeInterface = './dist/Templates/nextjs/Interfaces/ReduxStore.mustache';
		const storeImportInterface = './dist/Templates/nextjs/Interfaces/ReduxImport.mustache';

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: isPage ? pageDirPath : compDirPath,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new interface file'
		};

		const replaceContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.interfaceDir}/index.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.interfaceDir}/index.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(isPage ? pageInterfaceIndex : compIntefaceIndex, templateProps),
			message: 'Interface file added to Interfaces/index.ts',
			regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
		};

		const replaceStoreParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.reduxInterfaceDir}/Store.d.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reduxInterfaceDir}/Store.d.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(storeInterface, templateProps),
			message: 'Interface file added to Interfaces/Redux/Store.d.ts',
			regexKey: /export type IStore\s[=]\s[{]/g
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		if (isConnectStore) {

			CommonHelper.replaceContent(replaceStoreParams);

			setTimeout(
				() => {
					const replaceStoreImportParams: ICommon.IReplaceContent = {
						fileDir: `${Config.nextjs.reduxInterfaceDir}/Store.d.ts`,
						filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reduxInterfaceDir}/Store.d.ts`), 'utf8'),
						getFileContent: () => CommonHelper.getTemplate(storeImportInterface, templateProps),
						message: 'Interface file added to import section in Interfaces/Redux/Store.d.ts\n',
						regexKey: /\s[}] from '@Interfaces';/g
					};
					CommonHelper.replaceContent(replaceStoreImportParams);
				},
				1500
			);

		}
	},

	createStyle: (answers: ICommon.IAnswers): void => {
		const templatePath = './dist/Templates/nextjs/Styles.mustache';
		const templateProps = { fileName: answers.fileName };
		const pageDirPath = `${Config.nextjs.pagesDir}/${answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase())}/style.scss`;
		const compDirPath = `${Config.nextjs.componentsDir}/${answers.fileName}/style.scss`;

		const writeFileProps = {
			dirPath: answers.isPage ? pageDirPath : compDirPath,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
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

	/* 	addReducerCombine: (templateProps: ICommon.ITemplateProps): void => {
			const replaceContentParams: ICommon.IReplaceContent = {
				fileDir: `${Config.nextjs.reducerDir}/index.ts`,
				filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
				getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/Store.mustache', templateProps),
				message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
				regexKey: /export default combineReducers[(][{]/g
			};
	
			CommonHelper.replaceContent(replaceContentParams);
		}, */

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
		const { fileName, lowerFileName, isConnectStore, upperFileName } = answers;

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

		const replaceReducerContentParams: ICommon.IReplaceContent = {
			fileDir: `${Config.nextjs.reducerDir}/index.ts`,
			filetoUpdate: fs.readFileSync(path.resolve('', `${Config.nextjs.reducerDir}/index.ts`), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate('./dist/Templates/nextjs/Reducers/Store.mustache', templateProps),
			message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
			regexKey: /export default combineReducers[(][{]/g
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.replaceContent(replaceContentParams);

		setTimeout(() => CommonHelper.replaceContent(replaceReducerContentParams), 1500);

		/* Helper.addReducerCombine(templateProps); */

		if (isConnectStore) {
			Helper.addActionConstIndex(templateProps);
		}
	},

	createClassComponent: (answers: ICommon.IAnswers): void => {

		const { lowerFileName, isConnectStore } = answers;
		const pagesDir = `${Config.nextjs.pagesDir}/${lowerFileName}`;
		const classDir = answers.isPage ? pagesDir : `${Config.nextjs.componentsDir}/${answers.fileName}`;
		const templatePath = './dist/Templates/nextjs/Components/Class.mustache';
		const templateProps = {
			fileName: answers.fileName,
			interfaceName: `I${answers.fileName}`,
			isConnectStore: answers.isConnectStore,
			isHaveStyle: answers.isHaveStyle,
			lowerFileName: answers.lowerFileName
		};
		const indexTemplate = './dist/Templates/nextjs/Components/index.mustache';

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.nextjs.componentsDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Component added to index.ts'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${classDir}/index.tsx`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new class component'
		};

		CommonHelper.createFile(classDir);
		CommonHelper.writeFile(writeFileProps);
		Helper.createInterface(answers, true);

		if (isConnectStore) {
			Helper.addReducer(templateProps);
			Helper.addAction(templateProps);
		}

		if (!answers.isPage) {
			CommonHelper.addToIndex(addIndexParams);
		}
	},

	createFuncComponent: (answers: ICommon.IAnswers): void => {
		const { lowerFileName, fileName, isHaveStyle } = answers;
		const funcDir = `${Config.nextjs.componentsDir}/${answers.fileName}`;
		const templatePath = './dist/Templates/nextjs/Components/Functional.mustache';
		const templateProps = {
			fileName,
			interfaceName: `I${fileName}`,
			isHaveStyle,
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
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Add new functional component.'
		};

		CommonHelper.createFile(funcDir);
		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createInterface(answers, false);
	}
};
