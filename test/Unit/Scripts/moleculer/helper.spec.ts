import { fs } from 'memfs';
import { Helper } from '../../../../src/Scripts/moleculer/helper';

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
});
