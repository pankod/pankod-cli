import { fs } from 'memfs';
import * as path from 'path'
const realFs = jest.requireActual('fs')

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
fs.mkdirSync('/src/Interfaces/Repositories/Test');


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

fs.mkdirSync('/Templates');
fs.mkdirSync('/Templates/moleculer');
fs.mkdirSync('/Templates/moleculer/Tests');
fs.mkdirSync('/Templates/moleculer/Services');
fs.mkdirSync('/Templates/moleculer/Repositories');

// Create Templates
fs.writeFileSync('/src/Templates/index.ts', '');
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');

fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');
fs.writeFileSync('/app/services/test.service.ts', 'moleculer test service');

fs.writeFileSync('/app/helpers/Test.ts', 'moleculer/nextjs helper');

fs.writeFileSync('/test/Utils/BrokerHelper.ts', '//#endregion Local Imports');

fs.writeFileSync('/Templates/moleculer/Tests/BrokerHelperImport.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/moleculer/Tests/BrokerHelperImport.mustache')));
fs.writeFileSync('/Templates/moleculer/Tests/BrokerHelperCreate.mustache', `broker.createService({{upperFileName}}Service);\nreturn broker;`);

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

fs.writeFileSync('/test/Integration/Integration.spec.ts', '');
fs.writeFileSync('/Templates/moleculer/Tests/IntegrationTest.mustache', `import ApiGateway = require('moleculer-web');
import setupDatabase from '@Test/Config/SetupDatabase';
import { getConnection } from 'typeorm';
import { BrokerHelper } from '@Test/Utils';

const request = require("supertest");
const broker = BrokerHelper.setupBroker();
let server;

beforeEach(async () => {
    await setupDatabase();
});

afterEach(async () => {
    await getConnection().close();
});

beforeAll(() => {
    const service = broker.createService(ApiGateway);
    server = service.server;
    return broker.start();
});

afterAll(() => broker.stop());

describe("Test {{fileName}} service requests", () => {
    it("Test POST request on {{fileName}} service <methodName> method", () => {

        const params = {
            //params
        }

        return request(server)
            .post("/{{lowerFileName}}/<methodName>")
            .query({ ...params })
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
                expect(res.body).toBe({});
            });
    });
});
`);

// Create Package.json
fs.writeFileSync('/package.json', `{ "pankod": { "projectType": "test", "plugins": ["styled"] } }`);

// eslint-disable-next-line
jest.mock('fs', () => require('memfs'));
