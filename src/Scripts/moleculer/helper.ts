//#region Global Imports
import * as fs from 'fs';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import { IMoleculerHelper } from './IMoleculerTypes';
//#endregion Local Imports

export const Helper = {
	addBrokerHelper: (answers: ICommon.IAnswers, brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams): void => {
		setTimeout(
			() => {
				CommonHelper.replaceContent(Helper.createParamsForAddBrokerHelper('create', brokerHelperTemplatesParams, answers));
			},
			100
		);

		CommonHelper.replaceContent(Helper.createParamsForAddBrokerHelper('import', brokerHelperTemplatesParams, answers));
	},
	createEntityInstance: (answers: ICommon.IAnswers, createEntityHelperParams: IMoleculerHelper.ICreateEntityHelperParams) => {
		const templateProps = { fileName: answers.fileName };

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.moleculer.entityDir}/${answers.fileName}.ts`,
			getFileContent: () => CommonHelper.getTemplate(createEntityHelperParams.templatePath, templateProps),
			message: 'Added new Entity Instance.'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.entityDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(createEntityHelperParams.indexTemplate, templateProps),
			message: 'Entity added to index.ts.'
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
	},
	// tslint:disable-next-line: max-line-length
	createParamsForAddBrokerHelper: (type: string, brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams, answers: ICommon.IAnswers): ICommon.IReplaceContent => {
		const templateProps = {
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};

		const replaceBrokerParams: ICommon.IReplaceContent = {
			fileDir: brokerHelperTemplatesParams.replaceFileDir,
			filetoUpdate: fs.readFileSync(path.resolve('', brokerHelperTemplatesParams.replaceFileDir), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(type === 'import' ? brokerHelperTemplatesParams.brokerHelperImport : brokerHelperTemplatesParams.brokerHelperCreate, templateProps),
			message: type === 'import' ? 'Service added to BrokerHelper Import' : 'Service added to BrokerHelper setupBroker.\n',
			regexKey: type === 'import' ? /\/\/\#endregion Local Imports/g : /^\s*return broker;/gm
		};

		return replaceBrokerParams;

	},
	createRepository: (answers: ICommon.IAnswers, createInterfaceParams: IMoleculerHelper.ICreateInterfaceParams): void => {
		const templatePath = './dist/Templates/moleculer/Repositories/Repository.mustache';

		const templateProps = {
			upperFileName: answers.upperFileName
		};

		const indexTemplate = './dist/Templates/moleculer/Repositories/RepoIndex.mustache';

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.repositoriesDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Repository added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new Repository.'
		};

		const repositoryTestParams = {
			answers,
			dirPath: `${Config.moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
			successMessage: 'Added new Repository test.',
			templatePath: './dist/Templates/moleculer/Tests/Repository.mustache',
			templateProps
		};

		if (!CommonHelper.isAlreadyExist(Config.moleculer.interfaceDir, answers.upperFileName)) {
			Helper.createInterface(answers, 'Repositories', '', createInterfaceParams);
		}

		const createEntityTemplatesParams = {
			indexTemplate: Config.moleculer.templates.createEntityIndexTemplate,
			templatePath: Config.moleculer.templates.createEntityTemplatePath
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createEntityInstance(answers, createEntityTemplatesParams);
		Helper.createTest(repositoryTestParams);
	},
	createService: (answers: ICommon.IAnswers, createServiceParams: IMoleculerHelper.ICreateServiceParams): void => {
		const templateProps = {
			fileName: answers.fileName,
			hasDatabase: answers.hasDatabase,
			isPrivate: answers.isPrivate,
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};


		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.servicesDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(createServiceParams.indexTemplate, templateProps),
			message: 'Service added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.moleculer.servicesDir}/${answers.lowerFileName}.service.ts`,
			getFileContent: () => CommonHelper.getTemplate(createServiceParams.templatePath, templateProps),
			message: 'Added new Service.'
		};

		const serviceTestParams = {
			answers,
			dirPath: `${Config.moleculer.servicesTestDir}/${answers.lowerFileName}.spec.ts`,
			successMessage: 'Added new Microservice test.',
			templatePath: createServiceParams.testTemplatePath,
			templateProps
		};

		const integrationTestParams = {
			answers,
			dirPath: `${Config.moleculer.integrationTestDir}/${answers.lowerFileName}.spec.ts`,
			successMessage: 'Added new Integration test.',
			templatePath: createServiceParams.integrationTemplatePath,
			templateProps
		};

		if (!CommonHelper.isAlreadyExist(Config.moleculer.interfaceDir, answers.upperFileName, true)) {
			Helper.createInterface(answers, 'Services', 'Service', createServiceParams.createInterfaceParams);
		}

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createServiceHelper(answers, createServiceParams.createServiceHelperParams);
		Helper.createTest(serviceTestParams);
		Helper.createIntegrationTest(integrationTestParams);
		Helper.addBrokerHelper(answers, createServiceParams.brokerHelperTemplatesParams);
	},
	createServiceHelper: (answers: ICommon.IAnswers, createServiceHelperParams: IMoleculerHelper.ICreateServiceHelperParams): void => {

		const templateProps = {
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.moleculer.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
			getFileContent: () => CommonHelper.getTemplate(createServiceHelperParams.templatePath, templateProps),
			message: 'Added new Service Helper'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.servicesHelperDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(createServiceHelperParams.indexTemplate, templateProps),
			message: 'Service Helper added to index.ts.'
		};

		const serviceHelperTestParams = {
			answers,
			dirPath: `${Config.moleculer.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
			successMessage: 'Added new Micro Service Helper test.',
			templatePath: createServiceHelperParams.testTemplatePath,
			templateProps
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createTest(serviceHelperTestParams);
	},

	createIntegrationTest: (options: ICommon.ICreateTest): void => {

		const integrationProps: ICommon.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		CommonHelper.writeFile(integrationProps);
	},
	createInterface: (answers: ICommon.IAnswers, dirType: string, prefix: string = '', createInterfaceParams: IMoleculerHelper.ICreateInterfaceParams) => {
		const templatePath = `${createInterfaceParams.templatePath}/${prefix}Interface.mustache`;
		const templateProps = { upperFileName: answers.upperFileName, dirType };

		const interfaceFilePath = `${Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
		const interfaceDirPath = `${Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}`;

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: interfaceFilePath,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.interfaceDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(createInterfaceParams.indexInterfaceTemplate, templateProps),
			message: 'Interface added to index.ts.'
		};

		const addFolderIndex: ICommon.IAddIndex = {
			dirPath: `${Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(createInterfaceParams.folderIndexTemplate, templateProps),
			message: 'Interface added to folder index.ts.'
		};

		CommonHelper.createFile(interfaceDirPath);
		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		CommonHelper.addToIndex(addFolderIndex);
	},
	createTest: (options: ICommon.ICreateTest): void => {
		const writeFileProps: ICommon.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		CommonHelper.writeFile(writeFileProps);

	}
};
