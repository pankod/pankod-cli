import { Answers } from 'inquirer';
import { fs } from 'memfs';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { Helper } from '../../../../src/Scripts/moleculer/helper';
import { Config } from '../../../../src/config';
import { IMoleculerHelper } from './../../../../src/Scripts/moleculer/IMoleculerTypes.d';
import { ICommon } from '../../../../src/Scripts/ICommon';

xdescribe('Helper tests', () => {


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

		const fileContent = CommonHelper.getTemplate(
			'/Templates/moleculer/Tests/BrokerHelperImport.mustache',
			{ upperFileName: answers.upperFileName, lowerFileName: answers.lowerFileName }
		)

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

		expect(fileIndexContent).toBe(CommonHelper.getTemplate(createEntityTemplatesParams.indexTemplate, answers));

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

	it('should createIntegrationTest', () => {
		const answers: ICommon.IAnswers = {
			fileName: 'integration',
			hasDatabase: true,
			isPrivate: true,
			lowerFileName: 'integration',
			upperFileName: 'Integration'
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
			dirPath: `${Config.moleculer.integrationTestDir}/${answers.upperFileName}.spec.ts`,
			successMessage: 'Added new Integration test.',
			templatePath: '/Templates/moleculer/Tests/IntegrationTest.mustache',
			templateProps
		};

		Helper.createTest(options);

		const fileContentPath = `${Config.moleculer.integrationTestDir}/${answers.upperFileName}.spec.ts`;
		const fileContent = String(fs.readFileSync(fileContentPath));

		expect(fileContent).toBe(CommonHelper.getTemplate(options.templatePath, answers));

	});

	it('should createServiceHelper', () => {
		const answers: ICommon.IAnswers = {
			fileName: 'service',
			lowerFileName: 'service',
			upperFileName: 'Service'
		};

		const createServiceHelperParams: IMoleculerHelper.ICreateServiceHelperParams = {
			indexTemplate: '/Templates/moleculer/Services/HelperIndex.mustache',
			templatePath: '/Templates/moleculer/Services/Helper.mustache',
			testTemplatePath: '/Templates/moleculer/Tests/ServiceHelper.mustache'
		};

		Helper.createServiceHelper(answers, createServiceHelperParams);

		const fileContentPath = `${Config.moleculer.servicesHelperDir}/${answers.upperFileName}Helper.ts`;
		const fileContent = String(fs.readFileSync(fileContentPath));

		expect(fileContent).toBe(CommonHelper.getTemplate(createServiceHelperParams.templatePath, answers));
	});


});
