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
fs.mkdirSync('/src/Components');
fs.mkdirSync('/src/Components/Test');

// Create Templates
fs.writeFileSync('/src/Templates/nextjs/nextjs.mustache', 'Test template nextjs.mustache {{fileName}}');
fs.writeFileSync('/app/pages/test/index.tsx', 'nextjs test page');

// AddRoute
fs.writeFileSync('/Templates/nextjs/Routes.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Routes.mustache')));
fs.writeFileSync('/app/routes.js', `\n\nmodule.exports = routes;`);

// CreateInterface

fs.writeFileSync('/Templates/nextjs/Interfaces/ComponentIndex.mustache',realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/ComponentIndex.mustache')))
fs.writeFileSync('/Templates/nextjs/Interfaces/Component.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/Component.mustache')));
fs.writeFileSync('/Templates/nextjs/Interfaces/ComponentIndex.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/ComponentIndex.mustache')));
fs.writeFileSync('/Templates/nextjs/Interfaces/PageIndex.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/PageIndex.mustache')));
fs.writeFileSync('/Templates/nextjs/Interfaces/ReduxImport.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/ReduxImport.mustache')));
fs.writeFileSync('/Templates/nextjs/Interfaces/ReduxStore.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Interfaces/ReduxStore.mustache')));
fs.writeFileSync('/src/Interfaces/index.ts', '// PAGE INTERFACES\n\n// COMPONENT INTERFACES');
fs.writeFileSync('/src/Interfaces/Redux/Store.d.ts', `//#region Interface Imports
import { IHomePage } from '@Interfaces';
//#endregion Interface Imports

export interface IStore {
	home: IHomePage.IStateProps;
}
`);

// CreateStyle
fs.writeFileSync('/Templates/nextjs/Styles.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Styles.mustache')));

// CreateFuncComponent
fs.writeFileSync('/Templates/nextjs/Components/Functional.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Components/Functional.mustache')));


