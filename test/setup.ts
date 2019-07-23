import { fs } from 'memfs';
process.chdir('/');

// Create Directories
fs.mkdirSync('/src');
fs.mkdirSync('/src/Templates');
fs.mkdirSync('/src/Templates/moleculer');
fs.mkdirSync('/src/Templates/nextjs');

fs.mkdirSync('/src/Entities');

fs.mkdirSync('/app');
fs.mkdirSync('/app/pages');
fs.mkdirSync('/app/pages/test');
fs.mkdirSync('/app/services');
fs.mkdirSync('/app/helpers');
fs.mkdirSync('/app/Test');

fs.mkdirSync('/test');
fs.mkdirSync('/test/Utils');

fs.mkdirSync('/Templates');
fs.mkdirSync('/Templates/moleculer');
fs.mkdirSync('/Templates/moleculer/Tests');
fs.mkdirSync('/Templates/moleculer/Repositories');

// Create Templates
fs.writeFileSync('/src/Templates/index.ts', '');
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');

fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');
fs.writeFileSync('/app/services/test.service.ts', 'moleculer test service');
fs.writeFileSync('/app/helpers/Test.ts', 'moleculer/nextjs helper');

fs.writeFileSync('/test/Utils/BrokerHelper.ts', '//#endregion Local Imports');

fs.writeFileSync('/Templates/moleculer/Tests/BrokerHelperImport.mustache', `const {{upperFileName}}Service = require('../../services/{{lowerFileName}}.service');\n//#endregion Local Imports`);
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

// Create Package.json
fs.writeFileSync('/package.json', `{ "pankod": { "projectType": "test", "plugins": ["styled"] } }`);

jest.mock('fs', () => require('memfs'));
