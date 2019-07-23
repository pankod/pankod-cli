import { fs } from 'memfs';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { Helper } from '../../../../src/Scripts/moleculer/helper';
import { Config } from '../../../../src/config';

describe('Helper tests', () => {
	it('should addBrokerHelper', () => {
		const brokerHelperTemplatesParams = {
			brokerHelperCreate: '/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
			brokerHelperImport: '/Templates/moleculer/Tests/BrokerHelperImport.mustache',
			replaceFileDir: '/test/Utils/BrokerHelper.ts'
		};
		const answers = {
			fileName: 'tests',
			lowerFileName: 'tests',
			upperFileName: 'Tests'
		};
		// tslint:disable-next-line: max-line-length
		const fileContent = `const ${answers.upperFileName}Service = require('../../services/${answers.lowerFileName}.service');\n//#endregion Local Imports`;
		Helper.addBrokerHelper(answers, brokerHelperTemplatesParams);
		const addedBrokerHelper = fs.readFileSync('/test/Utils/BrokerHelper.ts');

		expect(String(addedBrokerHelper)).toEqual(`${fileContent}`);

	});

	it('should createEntityInstance', () => {
		const createEntityTemplatesParams = {
			indexTemplate: '/Templates/moleculer/Repositories/EntityIndex.mustache',
			templatePath: '/Templates/moleculer/Repositories/Entity.mustache'
		};

		const answers = {
			fileName: 'tests'
		};

		const fileIndexContentPath = `${Config.moleculer.entityDir}/index.ts`;
		Helper.createEntityInstance(answers, createEntityTemplatesParams);

		const fileContentPath = `${Config.moleculer.entityDir}/${answers.fileName}.ts`;
		const fileContent = String(fs.readFileSync(fileContentPath));

		expect(fileContent).toBe(CommonHelper.getTemplate(createEntityTemplatesParams.templatePath, answers));

		const fileIndexContent = String(fs.readFileSync(fileIndexContentPath));

		expect(fileIndexContent).toBe(CommonHelper.getTemplate(createEntityTemplatesParams.indexTemplate, answers) + '\n');

	});
});
