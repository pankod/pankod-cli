import { fs } from 'memfs';

process.chdir('/');

// Create Directories
fs.mkdirSync('/src');
fs.mkdirSync('/src/Templates');
fs.mkdirSync('/src/Templates/moleculer');
fs.mkdirSync('/src/Templates/nextjs');

fs.mkdirSync('/app');
fs.mkdirSync('/app/pages');
fs.mkdirSync('/app/pages/test');
fs.mkdirSync('/app/services');
fs.mkdirSync('/app/helpers');
fs.mkdirSync('/app/Test');

// Create Templates
fs.writeFileSync('/src/Templates/index.ts', '');
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');

fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');
fs.writeFileSync('/app/services/test.service.ts', 'moleculer test service');
fs.writeFileSync('/app/helpers/Test.ts', 'moleculer/nextjs helper');

// Create Package.json
fs.writeFileSync('/package.json', `{ "pankod": { "projectType": "test", "plugins": ["styled"] } }`);

jest.mock('fs', () => require('memfs'));
