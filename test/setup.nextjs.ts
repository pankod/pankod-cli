import { fs } from 'memfs';
import * as path from 'path'

const realFs = jest.requireActual('fs')

process.chdir('/');

// Nextjs Directories
fs.mkdirSync('/Templates/nextjs');
fs.mkdirSync('/Templates/nextjs/Interfaces');
fs.mkdirSync('/src/Interfaces/Redux');
fs.mkdirSync('/src/Interfaces/Pages');
fs.mkdirSync('/src/Interfaces/Components');

// Create Templates
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');

fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');

// AddRoute 
fs.writeFileSync('/Templates/nextjs/Routes.mustache', `\t  .add('/{{#hasPath}}{{{routePath}}}{{/hasPath}}{{^hasPath}}{{fileName}}{{/hasPath}}', '/{{fileName}}/index')\n\nmodule.exports = routes;`);
fs.writeFileSync('/app/routes.js', `\n\nmodule.exports = routes;`);

// CreateStyle

// CreateInterface
fs.writeFileSync('/Templates/nextjs/Interfaces/ComponentIndex.mustache',`// COMPONENT INTERFACES\nexport { I{{fileName}} } from '@Interfaces/Components/{{fileName}}.d.ts';`)
fs.writeFileSync('/Templates/nextjs/Interfaces/Component.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/Component.mustache')));

fs.writeFileSync('/Templates/nextjs/Interfaces/ComponentIndex.mustache', `// COMPONENT INTERFACES \nexport { I{{fileName}} } from '@Interfaces/Components/{{fileName}}.d.ts';`);
fs.writeFileSync('/Templates/nextjs/Interfaces/PageIndex.mustache', `// PAGE INTERFACES \nexport { I{{fileName}} } from '@Interfaces/Pages/{{fileName}}.d.ts';`);
fs.writeFileSync('/Templates/nextjs/Interfaces/ReduxImport.mustache', `, I{{fileName}} } from '@Interfaces';`);
fs.writeFileSync('/Templates/nextjs/Interfaces/ReduxStore.mustache', `export interface IStore {
    {{lowerFileName}}: I{{upperFileName}}.IStateProps`);

fs.writeFileSync('/src/Interfaces/index.ts', '// PAGE INTERFACES\n\n// COMPONENT INTERFACES');
fs.writeFileSync('/src/Interfaces/Redux/Store.d.ts', `//#region Interface Imports
import { IHomePage } from '@Interfaces';
//#endregion Interface Imports

export interface IStore {
	home: IHomePage.IStateProps;
}
`);
