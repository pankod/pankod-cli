import { fs } from 'memfs';
import * as path from 'path';

const realFs = jest.requireActual('fs');

process.chdir('/');

// Svelte Directories
fs.mkdirSync('/Templates/svelte');
fs.mkdirSync('/Templates/svelte/Components');
fs.mkdirSync('/Templates/svelte/Tests');



fs.mkdirSync('/src/Templates/svelte');


// createTest
fs.writeFileSync(
	'/Templates/svelte/Tests/Test.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/svelte/Tests/Test.mustache'))
);


// CreateStyle
fs.writeFileSync(
	'/Templates/svelte/Styles.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/svelte/Styles.mustache'))
);

// CreateComponent
fs.writeFileSync(
	'/Templates/svelte/Components/Component.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/svelte/Components/Component.mustache'))
);
