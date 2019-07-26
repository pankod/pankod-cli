import { fs } from 'memfs';
import * as path from 'path'

const realFs = jest.requireActual('fs')

process.chdir('/');

// Nextjs Directories
fs.mkdirSync('/Templates/nextjs');
fs.mkdirSync('/Templates/nextjs/Interfaces');
fs.mkdirSync('/Templates/nextjs/Components');
fs.mkdirSync('/Templates/nextjs/Reducers');


fs.mkdirSync('/src/Interfaces/Redux');
fs.mkdirSync('/src/Interfaces/Pages');
fs.mkdirSync('/src/Interfaces/Components');
fs.mkdirSync('/src/Components');
fs.mkdirSync('/src/Components/Style');

fs.mkdirSync('/src/Redux')
fs.mkdirSync('/src/Redux/Reducers')
fs.mkdirSync('/src/Actions')
fs.mkdirSync('/src/Definitions')

fs.mkdirSync('/pages')

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

// Components
fs.writeFileSync('/Templates/nextjs/Components/Class.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Components/Class.mustache')));
fs.writeFileSync('/Templates/nextjs/Components/index.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Components/index.mustache')));

fs.writeFileSync(
	'/Templates/nextjs/Reducers/index.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/index.mustache'))
);

fs.writeFileSync(
	'/Templates/nextjs/Reducers/Reducer.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/Reducer.mustache'))
)

fs.writeFileSync(
	'/Templates/nextjs/Reducers/ActionConst.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/ActionConst.mustache'))
)

fs.writeFileSync(
	'/Templates/nextjs/Reducers/ActionIndex.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/ActionIndex.mustache'))
)

fs.writeFileSync(
	'/Templates/nextjs/Reducers/Action.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/Action.mustache'))
)

fs.writeFileSync(
	'/Templates/nextjs/Reducers/Store.mustache',
	realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Reducers/Store.mustache'))
)

fs.writeFileSync(
	'/src/Actions/index.ts',
	`export { HomeActions } from './HomeActions';`
)

fs.writeFileSync('/src/Interfaces/index.ts', '// PAGE INTERFACES\n\n// COMPONENT INTERFACES');
fs.writeFileSync('/src/Interfaces/Redux/Store.d.ts', `//#region Interface Imports
import { IHomePage } from '@Interfaces';
//#endregion Interface Imports

export interface IStore {
	home: IHomePage.IStateProps;
}
`);

fs.writeFileSync('/src/Redux/Reducers/index.ts', `import { combineReducers } from 'redux';

import { HomeReducer } from './home';

export default combineReducers({
	home: HomeReducer,
});`)

fs.writeFileSync('/src/Definitions/ActionConsts.ts', `export const ActionConsts = {
	Home: {
		ResetReducer: 'Home_ResetReducer',
		SetReducer: 'Home_SetReducer',
	},
};`)

// CreateStyle
fs.writeFileSync('/Templates/nextjs/Styles.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Styles.mustache')));

// CreateFuncComponent
fs.writeFileSync('/Templates/nextjs/Components/Functional.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Components/Functional.mustache')));
fs.writeFileSync('/Templates/nextjs/Components/index.mustache', realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs/Components/index.mustache')));
