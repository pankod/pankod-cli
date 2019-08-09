import { fs } from 'memfs';

process.chdir('/');

// Create Directories
fs.mkdirSync('/src');
fs.mkdirSync('/src/Templates');
fs.mkdirSync('/src/Interface');

fs.mkdirSync('/test');
fs.mkdirSync('/test/Utils');
fs.mkdirSync('/test/Unit');

fs.mkdirSync('/Templates');

// Create Templates
fs.writeFileSync('/src/Templates/index.ts', '');

fs.mkdirSync('/exist');
fs.writeFileSync('/exist/Test.ts', 'Test file.');

// Create Package.json
fs.writeFileSync('/package.json', `{ "pankod": { "projectType": "test", "plugins": ["styled"] } }`);

// eslint-disable-next-line
jest.mock('fs', () => require('memfs'));
