import { fs } from 'memfs';
import * as path from 'path';

const realFs = jest.requireActual('fs');

process.chdir('/');

// nextjs2 Directories
fs.mkdirSync('/app2');
fs.mkdirSync('app2/src');
fs.mkdirSync('app2/src/Templates');
fs.mkdirSync('app2/src/Interfaces');

fs.mkdirSync('/Templates/nextjs2');
fs.mkdirSync('/Templates/nextjs2/Interfaces');
fs.mkdirSync('/Templates/nextjs2/Components');
fs.mkdirSync('/Templates/nextjs2/Reducers');
fs.mkdirSync('/Templates/nextjs2/Tests');

fs.mkdirSync('/app2/helpers');
fs.mkdirSync('/app2/pages');
fs.mkdirSync('/app2/pages/test');
fs.mkdirSync('/app2/services');
fs.mkdirSync('/app2/Test');

fs.mkdirSync('app2/src/Interfaces/Redux');
fs.mkdirSync('app2/src/Interfaces/Pages');
fs.mkdirSync('app2/src/Interfaces/Components');
fs.mkdirSync('app2/src/Components');
fs.mkdirSync('app2/src/Components/Style');

fs.mkdirSync('app2/src/Redux');
fs.mkdirSync('app2/src/Redux/Reducers');
fs.mkdirSync('app2/src/Actions');
fs.mkdirSync('app2/src/Definitions');
fs.mkdirSync('app2/src/Definitions/ActionConsts');
fs.mkdirSync('app2/src/Templates/nextjs2');

// Create Templates
fs.writeFileSync(
    'app2/src/Templates/nextjs2/nextjs2.mustache',
    'Test template nextjs2.mustache {{fileName}}'
);
fs.writeFileSync('/app2/pages/test/index.tsx', 'nextjs2 test page');

// AddRoute
fs.writeFileSync(
    '/Templates/nextjs2/Routes.mustache',
    realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs2/Routes.mustache'))
);
fs.writeFileSync('/app2/routes.js', `\n\nexport default routes;`);

// CreateInterface
fs.writeFileSync(
    '/Templates/nextjs2/Interfaces/Component.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Interfaces/Component.mustache')
    )
);
fs.writeFileSync(
    '/Templates/nextjs2/Interfaces/PageIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Interfaces/PageIndex.mustache')
    )
);
fs.writeFileSync(
    '/Templates/nextjs2/Interfaces/ReduxImport.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Interfaces/ReduxImport.mustache')
    )
);
fs.writeFileSync(
    '/Templates/nextjs2/Interfaces/ReduxStore.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Interfaces/ReduxStore.mustache')
    )
);

// Components
fs.writeFileSync(
    '/Templates/nextjs2/Components/Class.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Components/Class.mustache')
    )
);
fs.writeFileSync(
    '/Templates/nextjs2/Components/index.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Components/index.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/index.mustache',
    realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/index.mustache'))
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/Reducer.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/Reducer.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/ActionConst.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/ActionConst.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/ActionIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/ActionIndex.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/Action.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/Action.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Reducers/Store.mustache',
    realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/Store.mustache'))
);

fs.writeFileSync('app2/src/Actions/index.ts', `export { HomeActions } from './HomeActions';`);

fs.writeFileSync('app2/src/Interfaces/index.ts', '// PAGE INTERFACES\n\n// COMPONENT INTERFACES');

fs.writeFileSync(
    'app2/src/Redux/IStore.d.ts',
    `// #region Interface Imports
import { IHomePage } from '@Interfaces';
// #endregion Interface Imports

export interface IStore {
	home: IHomePage.IStateProps;
}
`
);

fs.writeFileSync(
    'app2/src/Redux/Reducers/index.ts',
    `import { combineReducers } from 'redux';

import { HomeReducer } from './home';

export default combineReducers({
	home: HomeReducer,
});`
);

fs.writeFileSync(
    'app2/src/Definitions/ActionConsts/ActionConsts.ts',
    `export const ActionConsts = {
	Home: {
		ResetReducer: 'Home_ResetReducer',
		SetReducer: 'Home_SetReducer',
	},
};`
);

// Actions
fs.writeFileSync(
    'app2/src/Actions/TestReducer.ts',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/Reducer.mustache')
    )
);

fs.writeFileSync(
    'app2/src/Actions/TestActions.ts',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Reducers/Action.mustache')
    )
);

// Tests
fs.writeFileSync(
    '/Templates/nextjs2/Tests/ReducerTest.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Tests/ReducerTest.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Tests/ActionTest.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Tests/ActionTest.mustache')
    )
);

fs.writeFileSync(
    '/Templates/nextjs2/Tests/ComponentTest.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Tests/ComponentTest.mustache')
    )
);
// CreateStyle
fs.writeFileSync(
    '/Templates/nextjs2/Styles.mustache',
    realFs.readFileSync(path.resolve(__dirname, '../src/Templates/nextjs2/Styles.mustache'))
);

// CreateFuncComponent
fs.writeFileSync(
    '/Templates/nextjs2/Components/Functional.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Components/Functional.mustache')
    )
);
fs.writeFileSync(
    '/Templates/nextjs2/Components/index.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/nextjs2/Components/index.mustache')
    )
);
