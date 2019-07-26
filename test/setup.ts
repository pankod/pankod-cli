import { fs } from 'memfs';
import * as path from 'path';
const realFs = jest.requireActual('fs');

process.chdir('/');

// Create Directories
fs.mkdirSync('/src');
fs.mkdirSync('/src/Templates');
fs.mkdirSync('/src/Templates/moleculer');
fs.mkdirSync('/src/Templates/nextjs');

fs.mkdirSync('/src/Entities');
fs.mkdirSync('/src/ServiceHelpers');

fs.mkdirSync('/src/Interfaces');
fs.mkdirSync('/src/Interfaces/Repositories');
// fs.mkdirSync('/src/Interfaces/Repositories/Test');
fs.mkdirSync('/src/Interfaces/Services');
// fs.mkdirSync('/src/Interfaces/Services/Test');

fs.mkdirSync('/services');

fs.mkdirSync('/app');
fs.mkdirSync('/app/pages');
fs.mkdirSync('/app/pages/test');
fs.mkdirSync('/app/services');
fs.mkdirSync('/app/helpers');
fs.mkdirSync('/app/Test');

fs.mkdirSync('/test');
fs.mkdirSync('/test/Utils');
fs.mkdirSync('/test/Unit');
fs.mkdirSync('/test/Unit/ServiceHelpers');
fs.mkdirSync('/test/Integration');
fs.mkdirSync('/test/Unit/MicroServices');

fs.mkdirSync('/Templates');
fs.mkdirSync('/Templates/moleculer');
fs.mkdirSync('/Templates/moleculer/Tests');
fs.mkdirSync('/Templates/moleculer/Services');
fs.mkdirSync('/Templates/moleculer/Repositories');
fs.mkdirSync('/Templates/moleculer/Interfaces');

// Create Templates
fs.writeFileSync('/src/Templates/index.ts', '');
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');

fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');
fs.writeFileSync('/app/services/test.service.ts', 'moleculer test service');
fs.writeFileSync('/app/helpers/Test.ts', 'moleculer/nextjs helper');

fs.writeFileSync('/test/Utils/BrokerHelper.ts', '//#endregion Local Imports');

fs.writeFileSync('/Templates/moleculer/Tests/BrokerHelperImport.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Tests/BrokerHelperImport.mustache')));

fs.writeFileSync('/Templates/moleculer/Tests/BrokerHelperCreate.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Tests/BrokerHelperCreate.mustache')));

fs.writeFileSync('/src/Entities/index.ts', '');
fs.writeFileSync('/Templates/moleculer/Repositories/Entity.mustache', `//#region Global Imports
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//#endregion Global Imports

@Entity()
export class {{fileName}} {
	@PrimaryGeneratedColumn()
	//id: number;

	@Column()
	//name: string;
}
`);

fs.writeFileSync('/Templates/moleculer/Repositories/EntityIndex.mustache', `export { {{fileName}} } from './{{fileName}}';`);

fs.writeFileSync('/Templates/moleculer/Tests/Repository.mustache', `import { {{upperFileName}}Repository } from '../../../src/Repositories/{{upperFileName}}';

describe('Test {{upperFileName}}Repository constructor', () => {
	it('should create an empty options', () => {
		expect({{upperFileName}}Repository).toBeDefined();
	});

	it('should work (method name)', async () => {
		const result = await {{upperFileName}}Repository.methodName(1);
		expect(result).toBeDefined();
	});
});
`);

fs.writeFileSync('/Templates/moleculer/Repositories/RepoIndex.mustache', `export { {{upperFileName}}Repository } from '@Repositories/{{upperFileName}}';`);
fs.writeFileSync('/Templates/moleculer/Repositories/Repository.mustache', `//#region Local Imports
import { {{upperFileName}} } from '@Entities/{{upperFileName}}';
//#endregion Local Imports

//#region Interface Imports
import { I{{upperFileName}} } from '@Interfaces';
//#endregion Interface Imports

export namespace {{upperFileName}}Repository {
	export const exampleMethod = async (): Promise<I{{fileName}}> => {

		return;
	};
}
`);

fs.writeFileSync('/src/ServiceHelpers/ServiceHelper.ts', '');
fs.writeFileSync('/test/Unit/ServiceHelper.spec.ts', '');
fs.writeFileSync('/Templates/moleculer/Tests/ServiceHelper.mustache', `//#region Local Imports
import { {{upperFileName}}Helper } from '@ServiceHelpers';
import { DummyContext } from '@Test/Utils';
//#endregion Local Imports

//#region Interface Imports
import { I{{upperFileName}}} from '@Interfaces';
//#endregion Interface Imports

describe('{{upperFileName}} Service Helper Constructor', () => {
	it('should module exist', async () => {
		expect({{upperFileName}}Helper).toBeDefined();
	});
});

describe('{{upperFileName}} service helpers', () => {
	it('', async () => {
		const params = {};

		const result = await {{upperFileName}}Helper.methodName(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
`);

fs.writeFileSync('/Templates/moleculer/Services/Helper.mustache', `//#region Global Imports
import { Context } from 'moleculer';
//#endregion Global Imports

//#region Interface Imports
import { } from '@Interfaces';
//#endregion Interface Imports

export module {{upperFileName}}Helper {

	const prefix: string = '{{lowerFileName}}';

	export const methodName = async (ctx: Context, params: ): Promise<> => await ctx.call(\`\${prefix}.methodName\`, params);

}

`);

fs.writeFileSync('/Templates/moleculer/Services/HelperIndex.mustache', `export { {{upperFileName}}Helper } from '@ServiceHelpers/{{upperFileName}}Helper';`);

fs.writeFileSync('/test/Integration/service.spec.ts', '');
fs.writeFileSync('/test/Integration/integration.spec.ts', '');

fs.writeFileSync('/Templates/moleculer/Tests/IntegrationTest.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Tests/IntegrationTest.mustache')));

fs.writeFileSync('/test/Unit/MicroServices/service.spec.ts', '');

// fs.writeFileSync('/src/Interfaces/Services/Test/ITest.d.ts', '');

fs.writeFileSync('/Templates/moleculer/Interfaces/Interface.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/Interface.mustache')));

fs.writeFileSync('/Templates/moleculer/Interfaces/index.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/index.mustache')));

fs.writeFileSync('/Templates/moleculer/Interfaces/FolderIndex.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/FolderIndex.mustache')));

fs.writeFileSync('/Templates/moleculer/Interfaces/ServiceInterface.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/ServiceInterface.mustache')));


fs.writeFileSync('/Templates/moleculer/Services/index.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Services/index.mustache')));

fs.writeFileSync('/Templates/moleculer/Services/Service.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Services/Service.mustache')));

fs.writeFileSync('/Templates/moleculer/Tests/Service.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Tests/Service.mustache')));

// Create Package.json
fs.writeFileSync('/package.json', `{ "pankod": { "projectType": "test", "plugins": ["styled"] } }`);

jest.mock('fs', () => require('memfs'));
