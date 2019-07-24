import { Answers } from 'inquirer';
import { fs } from 'memfs';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { Helper } from '../../../../src/Scripts/moleculer/helper';
import { Config } from '../../../../src/config';
import { IMoleculerHelper } from './../../../../src/Scripts/moleculer/IMoleculerTypes.d';
import { ICommon } from '../../../../src/Scripts/ICommon';

describe('Helper tests', () => {


	it('should addBrokerHelper', () => {
		// const brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams = {
		// 	brokerHelperCreate: Config.moleculer.templates.brokerHelperCreate,
		// 	brokerHelperImport: Config.moleculer.templates.brokerHelperImport,
		// 	replaceFileDir: Config.moleculer.brokerHelper
		// };

		const brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams = {
			brokerHelperCreate: '/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
			brokerHelperImport: '/Templates/moleculer/Tests/BrokerHelperImport.mustache',
			replaceFileDir: '/test/Utils/BrokerHelper.ts'
		};
		const answers: ICommon.IAnswers = {
			fileName: 'tests',
			lowerFileName: 'tests',
			upperFileName: 'Tests'
		};
		// tslint:disable-next-line
		const fileContent = `const ${answers.upperFileName}Service = require('../../services/${answers.lowerFileName}.service');\n//#endregion Local Imports`;
		Helper.addBrokerHelper(answers, brokerHelperTemplatesParams);
		const addedBrokerHelper = fs.readFileSync('/test/Utils/BrokerHelper.ts');

		expect(String(addedBrokerHelper)).toEqual(`${fileContent}`);

	});

	it('should createEntityInstance', () => {
		// const createEntityTemplatesParams = {
		// 	indexTemplate: Config.moleculer.templates.createEntityIndexTemplate,
		// 	templatePath: Config.moleculer.templates.createEntityTemplatePath
		// };


		const answers: ICommon.IAnswers = {
			fileName: 'tests'
		};

		const createEntityTemplatesParams = {
			indexTemplate: '/Templates/moleculer/Repositories/EntityIndex.mustache',
			templatePath: '/Templates/moleculer/Repositories/Entity.mustache'
		};

		const fileIndexContentPath = `${Config.moleculer.entityDir}/index.ts`;
		Helper.createEntityInstance(answers, createEntityTemplatesParams);

		const fileContentPath = `${Config.moleculer.entityDir}/${answers.fileName}.ts`;
		const fileContent = String(fs.readFileSync(fileContentPath));

		expect(fileContent).toBe(CommonHelper.getTemplate(createEntityTemplatesParams.templatePath, answers));

		const fileIndexContent = String(fs.readFileSync(fileIndexContentPath));

		expect(fileIndexContent).toBe(CommonHelper.getTemplate(createEntityTemplatesParams.indexTemplate, answers) + '\n');

	});
	// it('should createRepository', () => {
	// 	const answers: ICommon.IAnswers = {
	// 		fileName: '',
	// 		upperFileName: 'Test'
	// 	};

	// 	const createRepositoryTestTemplateParams = {
	// 		indexTemplate: '/Templates/moleculer/Repositories/RepoIndex.mustache',
	// 		templatePath: '/Templates/moleculer/Repositories/Repository.mustache'
	// 	};

	// 	const createTestRepositoryTemplatePath = '/Templates/moleculer/Tests/Repository.mustache';
	// 	console.log('createRepository');

	// 	Helper.createRepository(answers, createRepositoryTestTemplateParams, createTestRepositoryTemplatePath);

	// 	const fileContentPath = `${Config.moleculer.repositoriesDir}/${answers.upperFileName}.ts`;
	// 	const fileContent = String(fs.readFileSync(fileContentPath));

	// 	expect(fileContent).toBe(CommonHelper.getTemplate(createRepositoryTestTemplateParams.templatePath, answers));

	// 	console.log('fileContent', fileContent);

	// 	console.log('fileContent', CommonHelper.getTemplate(createRepositoryTestTemplateParams.templatePath, answers));

	// });

	it('should createTest', () => {
		const answers: ICommon.IAnswers = {
			fileName: 'service',
			hasDatabase: true,
			isPrivate: true,
			lowerFileName: 'service',
			upperFileName: 'Service'
		};
		const templateProps = {
			fileName: answers.fileName,
			hasDatabase: answers.hasDatabase,
			isPrivate: answers.isPrivate,
			lowerFileName: answers.lowerFileName,
			upperFileName: answers.upperFileName
		};
		const options: ICommon.ICreateTest = {
			answers,
			dirPath: `${Config.moleculer.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
			successMessage: 'Added new Microservice test.',
			templatePath: '/Templates/moleculer/Tests/ServiceHelper.mustache',
			templateProps
		};

		Helper.createTest(options);

		const fileContentPath = `${Config.moleculer.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`;
		const fileContent = String(fs.readFileSync(fileContentPath));

		expect(fileContent).toBe(CommonHelper.getTemplate(options.templatePath, answers));

	});

});
