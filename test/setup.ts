import { fs } from 'memfs';

process.chdir('/');

// Create Directories
fs.mkdirSync('/src');
fs.mkdirSync('/src/Templates');
fs.mkdirSync('/src/Templates/moleculer');
fs.mkdirSync('/src/Templates/nextjs');

// Create Templates
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache');

jest.mock('fs', () => require('memfs'));