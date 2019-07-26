import { fs } from 'memfs';
import { Helper } from '../../../../src/Scripts/nextjs/helper';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { Config } from '../../../../src/config';
import { INextjsHelper } from '../../../../src/Scripts/nextjs/INextjsTypes';

const createInterfaceParams: INextjsHelper.ICreateInterfaceParams = {
	templatePath: '/Templates/nextjs/Interfaces/Component.mustache',
	pageInterfaceIndex: '/Templates/nextjs/Interfaces/PageIndex.mustache',
	storeImportInterface: '/Templates/nextjs/Interfaces/ReduxImport.mustache',
	compInterfaceIndex: '/Templates/nextjs/Interfaces/ComponentIndex.mustache',
	storeInterface: '/Templates/nextjs/Interfaces/ReduxStore.mustache',
	interfaceDir: '/src/Interfaces/index.ts',
	reduxInterfaceDir: '/src/Interfaces/Redux/Store.d.ts',
	pageInterfaceDir: '/src/Interfaces/Pages',
	compInterfaceDir: '/src/Interfaces/Components'
};

const addActionConstIndexParams: INextjsHelper.IAddActionConstIndexParams = {
	actionConstTemplatePath: '/Templates/nextjs/Reducers/ActionConst.mustache'
};

const addActionParams: INextjsHelper.IAddActionParams = {
	actionIndexTemplatePath: '/Templates/nextjs/Reducers/ActionIndex.mustache',
	actionTemplatePath: '/Templates/nextjs/Reducers/Action.mustache'
}

const addReducerParams: INextjsHelper.IAddReducerParams = {
	addActionConstIndexParams,
	reducerIndexTemplatePath: '/Templates/nextjs/Reducers/index.mustache',
	reducerStoreTemplatePath: '/Templates/nextjs/Reducers/Store.mustache',
	reducerTemplatePath: '/Templates/nextjs/Reducers/Reducer.mustache'
};

describe('Helper tests', () => {
	describe('Test addRoute method', () => {
		it('Should add page route', () => {

			const addRouteParams = {
				routesDir: '/app/routes.js',
				routesTemplate: '/Templates/nextjs/Routes.mustache'
			};
			const answers = {
				fileName: 'test',
				hasPath: true,
				routePath: 'test-route'
			};
			// tslint:disable-next-line: max-line-length
			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Routes.mustache', answers);

			Helper.addRoute(answers, addRouteParams);

			const addedRoute = fs.readFileSync('/app/routes.js');
			expect(String(addedRoute)).toEqual(`${fileContent}`);
		});
	});

	describe('Test createInterface methods', () => {


		const answers = {
			fileName: 'Test',
			lowerFileName: 'test',
			upperFileName: 'Test',
			isPage: false,
			isConnectStore: true,
			isClass: true
		};

		it('Should create component interface file', () => {
			Helper.createInterface(answers, true, createInterfaceParams);

			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/Component.mustache', answers);

			const interfaceFilePath = `${Config.nextjs.compInterfaceDir}/${answers.fileName}.d.ts`;
			const createdInterface = String(fs.readFileSync(interfaceFilePath));

			expect(createdInterface).toBe(fileContent);
		});

		it('Should add export interface definitions to Redux/Store.d.ts', () => {
			fs.writeFileSync('/src/Interfaces/Redux/Store.d.ts', `//#region Interface Imports
			import { IHomePage } from '@Interfaces';
			//#endregion Interface Imports

			export interface IStore {
				home: IHomePage.IStateProps;
			}
			`);

			Helper.createInterface(answers, true, createInterfaceParams);
			const reduxStoreContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/ReduxStore.mustache', answers);
			const createdInterface = String(fs.readFileSync(Config.nextjs.reduxInterfaceDir));
			expect(createdInterface).toMatch(reduxStoreContent);
		});

		it('Should add @Interface import to Redux/Store.d.ts', done => {
			fs.writeFileSync('/src/Interfaces/Redux/Store.d.ts', `//#region Interface Imports
			import { IHomePage } from '@Interfaces';
			//#endregion Interface Imports

			export interface IStore {
				home: IHomePage.IStateProps;
			}
			`);

			Helper.createInterface(answers, true, createInterfaceParams);
			const reduxImportContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/ReduxImport.mustache', answers);

			setTimeout(() => {
				const createdInterface = String(fs.readFileSync(Config.nextjs.reduxInterfaceDir));
				expect(createdInterface).toMatch(reduxImportContent);
				done();
			}, 100);

		});

		it('Should add component interface export', () => {
			Helper.createInterface(answers, true, createInterfaceParams);

			const fileIndexContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/ComponentIndex.mustache', answers);
			const createdInterface = String(fs.readFileSync(Config.nextjs.interfaceDir));

			expect(createdInterface).toMatch(fileIndexContent);
		});

		it('Should add page interface export', () => {
			answers.isPage = true;
			Helper.createInterface(answers, true, createInterfaceParams);

			const pageIndexContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/PageIndex.mustache', answers);
			const createdInterface = String(fs.readFileSync(Config.nextjs.interfaceDir));

			expect(createdInterface).toMatch(pageIndexContent);
		});

	});

	describe('Test createStyle method', () => {
		it('Should create style file', () => {
			const answers = {
				fileName: 'Style',
				hasStyle: true,
				lowerFileName: 'style'
			};

			const createStyleParams = {
				compDirPath: '/src/Components',
				pageDirPath: '/pages',
				templatePath: '/Templates/nextjs/Styles.mustache'
			};

			Helper.createStyle(answers, createStyleParams);

			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Styles.mustache', answers);
			const createdStyle = String(fs.readFileSync('./src/Components/Style/style.scss'));

			expect(createdStyle).toBe(fileContent);
		});
	});

	describe('addActionConstIndex', () => {
		it('should add action constants to index', () => {

		})
	})

	describe('addAction', () => {
		it('should add new action file', () => {

		})

		it('should add to action index file', () => {

		})
	})

	describe('addReducer', () => {
		it('should add to reducers/index', () => {

		})

		it('should add new reducer', () => {

		})
	})

	describe('createClassComponent', () => {

		const params: INextjsHelper.ICreateClassComponentParams = {
			templatePath: '/Templates/nextjs/Components/Class.mustache',
			indexTemplatePath: '/Templates/nextjs/Components/index.mustache',
			createInterfaceParams,
			addReducerParams,
			addActionParams
		}

		describe('Class Component', () => {
			const answers = {
				fileName: 'Test',
				lowerFileName: 'test',
				upperFileName: 'Test',
				isConnectStore: true,
				isPage: false,
				hasStyle: true,
				isClass: true
			}

			Helper.createClassComponent(answers, params)

			it('should create class component file', () => {
				const createdClassComponent = String(fs.readFileSync('/src/Components/Test/index.tsx'))

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Components/Class.mustache',
					{ ...answers, interfaceName: 'ITest' }
				)

				expect(createdClassComponent).toBe(fileContent)
			})

			it('should add component to index.ts', () => {
				const createdIndexFile = String(fs.readFileSync('/src/Components/index.ts'));

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Components/index.mustache',
					answers
				)

				expect(createdIndexFile).toBe(fileContent)
			})

			it('should create interface', () => {
				const createdComponentInterfaceFile = String(fs.readFileSync('/src/Interfaces/Components/Test.d.ts'))

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Interfaces/Component.mustache',
					{ ...answers }
				)

				expect(createdComponentInterfaceFile).toBe(fileContent)
			})

			it('should add reducer', () => {
				const createdReducer = String(fs.readFileSync('/src/Redux/Reducers/test.ts'))

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Reducers/Reducer.mustache',
					answers
				)

				expect(createdReducer).toBe(fileContent)
			})

			it('should add action', () => {
				const createdAction = String(fs.readFileSync('/src/Actions/TestActions.ts'))

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Reducers/Action.mustache',
					answers
				)

				expect(createdAction).toBe(fileContent)
			})
		})

		describe('Page', () => {
			const answers = {
				fileName: 'Page',
				lowerFileName: 'page',
				upperFileName: 'Page',
				isConnectStore: false,
				isPage: true,
				hasStyle: true,
				interfaceName: 'IPage'
			}

			Helper.createClassComponent(answers, params)

			it('should create page/index.tsx', () => {
				const createdPage = String(fs.readFileSync('/pages/page/index.tsx'))

				const fileContent = CommonHelper.getTemplate(
					'/Templates/nextjs/Components/Class.mustache',
					answers
				)

				expect(createdPage).toBe(fileContent)
			})
		})
	})

	describe('createFunctionalComponent', () => {
		const answers = {
			fileName: 'Functest',
			hasStyle: true,
			lowerFileName: 'functest',
			interfaceName: 'IFunctest'
		};

		const createFunctionalComponentParams = {
			indexTemplatePath: '/Templates/nextjs/Components/index.mustache',
			templatePath: '/Templates/nextjs/Components/Functional.mustache',
			componentsDir: '/src/Components',
			createInterfaceParams
		};

		it('should create functional component dir and file', () => {
			Helper.createFuncComponent(answers, createFunctionalComponentParams);

			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Components/Functional.mustache', answers);
			const createdComponent = String(fs.readFileSync('/src/Components/Functest/index.tsx'));

			expect(createdComponent).toBe(fileContent);
		});

		it('should add to index', () => {
			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Components/index.mustache', answers);
			const createdComponent = String(fs.readFileSync('/src/Components/index.ts'));

			expect(createdComponent).toMatch(fileContent);
		});

		it('should create interface', () => {
			const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Interfaces/Component.mustache', answers);
			const interfaceFilePath = `${Config.nextjs.compInterfaceDir}/${answers.fileName}.d.ts`;
			const createdInterface = String(fs.readFileSync(interfaceFilePath));

			expect(createdInterface).toBe(fileContent);
		});
	});
});
