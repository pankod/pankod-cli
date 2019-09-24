import { fs } from 'memfs';
import { Helper } from '../../../../src/Scripts/nextjs2/helper';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { Config } from '../../../../src/config';
import { INextjs2Helper } from '../../../../src/Scripts/nextjs2/INextjs2Types';

const createInterfaceParams: INextjs2Helper.ICreateInterfaceParams = {
    templatePath: '/Templates/nextjs2/Interfaces/Component.mustache',
    pageInterfaceIndex: '/Templates/nextjs2/Interfaces/PageIndex.mustache',
    storeImportInterface: '/Templates/nextjs2/Interfaces/ReduxImport.mustache',
    compInterfaceIndex: '/Templates/nextjs2/Interfaces/ComponentIndex.mustache',
    storeInterface: '/Templates/nextjs2/Interfaces/ReduxStore.mustache',
    interfaceDir: '/src/Interfaces/index.ts',
    reduxInterfaceDir: 'app2/src/Redux/IStore.d.ts',
    pageInterfaceDir: '/src/Interfaces/Pages',
    compInterfaceDir: '/src/Interfaces/Components',
    componentsDir: 'src/Components'
};

const addActionConstIndexParams: INextjs2Helper.IAddActionConstIndexParams = {
    actionConstTemplatePath: '/Templates/nextjs2/Reducers/ActionConst.mustache',
    actionConstsFileDir: '/app2/src/Definitions/ActionConsts/ActionConsts.ts'
};

const addActionParams: INextjs2Helper.IAddActionParams = {
    actionIndexTemplatePath: '/Templates/nextjs2/Reducers/ActionIndex.mustache',
    actionTemplatePath: '/Templates/nextjs2/Reducers/Action.mustache',
    actionTestTemplatePath: '/Templates/nextjs2/Tests/ActionTest.mustache'
};

const addReducerParams: INextjs2Helper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: '/Templates/nextjs2/Reducers/index.mustache',
    reducerStoreTemplatePath: '/Templates/nextjs2/Reducers/Store.mustache',
    reducerTemplatePath: '/Templates/nextjs2/Reducers/Reducer.mustache',
    reducerTestTemplatePath: '/Templates/nextjs2/Tests/ReducerTest.mustache'
};

describe('Helper tests', () => {
    describe('Test addRoute method', () => {
        it('Should add page route', () => {
            const addRouteParams = {
                routesDir: '/app2/routes.js',
                routesTemplate: '/Templates/nextjs2/Routes.mustache'
            };
            const answers = {
                fileName: 'test',
                hasPath: true,
                routePath: 'test-route'
            };
            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Routes.mustache',
                answers
            );

            Helper.addRoute(answers, addRouteParams);

            const addedRoute = fs.readFileSync('/app2/routes.js');

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

            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/Component.mustache',
                answers
            );

            const interfaceFilePath = `${Config.nextjs2.compInterfaceDir}/${answers.fileName}.d.ts`;
            const createdInterface = String(fs.readFileSync(interfaceFilePath));

            expect(createdInterface).toBe(fileContent);
        });

        it('Should add export interface definitions to Redux/IStore.d.ts', async () => {
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

            await Helper.createInterface(answers, true, createInterfaceParams);

            const reduxStoreContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/ReduxStore.mustache',
                answers
            );
            const createdInterface = String(
                fs.readFileSync(createInterfaceParams.reduxInterfaceDir)
            );

            expect(createdInterface).toMatch(reduxStoreContent);
        });

        it('Should add @Interface import to Redux/IStore.d.ts', () => {
            fs.writeFileSync(
                createInterfaceParams.reduxInterfaceDir,
                `// #region Interface Imports
			import { IHomePage } from "@Interfaces";
			// #endregion Interface Imports

			export interface IStore {
				home: IHomePage.IStateProps;
			}
			`
            );

            Helper.createInterface(answers, true, createInterfaceParams);

            const reduxImportContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/ReduxImport.mustache',
                answers
            );

            setTimeout(() => {
                const createdInterface = String(
                    fs.readFileSync(createInterfaceParams.reduxInterfaceDir)
                );

                expect(createdInterface).toMatch(reduxImportContent);
            }, 100);
        });

        it('Should add component interface export', () => {
            fs.writeFileSync(
                createInterfaceParams.reduxInterfaceDir,
                `// #region Interface Imports
			import { IHomePage } from "@Interfaces";
			// #endregion Interface Imports

			export interface IStore {
				home: IHomePage.IStateProps;
			}
			`
            );

            Helper.createInterface(answers, true, createInterfaceParams);

            const fileIndexContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/PageIndex.mustache',
                answers
            );
            setTimeout(() => {
                const createdInterface = String(
                    fs.readFileSync(createInterfaceParams.reduxInterfaceDir)
                );

                expect(createdInterface).toMatch(fileIndexContent);
            }, 100);
        });

        it('Should add page interface export', () => {
            fs.writeFileSync(
                createInterfaceParams.reduxInterfaceDir,
                `// #region Interface Imports
			import { IHomePage } from "@Interfaces";
			// #endregion Interface Imports

			export interface IStore {
				home: IHomePage.IStateProps;
			}
			`
            );

            answers.isPage = true;
            Helper.createInterface(answers, true, createInterfaceParams);

            const pageIndexContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/PageIndex.mustache',
                answers
            );

            setTimeout(() => {
                const createdInterface = String(
                    fs.readFileSync(createInterfaceParams.reduxInterfaceDir)
                );

                expect(createdInterface).toMatch(pageIndexContent);
            }, 100);
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
                templatePath: '/Templates/nextjs2/Styles.mustache'
            };

            Helper.createStyle(answers, createStyleParams);

            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Styles.mustache',
                answers
            );
            const createdStyle = String(fs.readFileSync('./src/Components/Style/style.scss'));

            expect(createdStyle).toBe(fileContent);
        });
    });

    describe('addActionConstIndex', () => {
        it('should add action constants to index', () => {});
    });

    describe('addAction', () => {
        it('should add new action file', () => {});

        it('should add to action index file', () => {});
    });

    describe('addReducer', () => {
        it('should add to reducers/index', () => {});

        it('should add new reducer', () => {});
    });

    describe('createClassComponent', () => {
        const params: INextjs2Helper.ICreateClassComponentParams = {
            templatePath: '/Templates/nextjs2/Components/Class.mustache',
            indexTemplatePath: '/Templates/nextjs2/Components/index.mustache',
            createInterfaceParams,
            addReducerParams,
            addActionParams
        };

        describe('Class Component', () => {
            const answers = {
                fileName: 'Test',
                lowerFileName: 'test',
                upperFileName: 'Test',
                isConnectStore: true,
                isPage: undefined,
                hasStyle: true,
                isClass: true
            };

            Helper.createClassComponent(answers, params);

            it('should create class component file', () => {
                const createdClassComponent = String(
                    fs.readFileSync('/src/Components/Test/index.tsx')
                );

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Components/Class.mustache',
                    { ...answers, interfaceName: 'ITest' }
                );

                expect(createdClassComponent).toBe(fileContent);
            });

            it('should add component to index.ts', () => {
                const createdIndexFile = String(fs.readFileSync('/src/Components/index.ts'));

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Components/index.mustache',
                    answers
                );

                expect(createdIndexFile).toBe(fileContent);
            });

            it('should create interface', () => {
                const createdComponentInterfaceFile = String(
                    fs.readFileSync('/src/Interfaces/Components/Test.d.ts')
                );

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Interfaces/Component.mustache',
                    { ...answers }
                );

                expect(createdComponentInterfaceFile).toBe(fileContent);
            });

            it('should add reducer', () => {
                const createdReducer = String(fs.readFileSync('/src/Redux/Reducers/test/index.ts'));

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Reducers/Reducer.mustache',
                    answers
                );

                expect(createdReducer).toBe(fileContent);
            });

            it('should add action', () => {
                const createdAction = String(fs.readFileSync('/src/Actions/TestActions/index.ts'));

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Reducers/Action.mustache',
                    answers
                );

                expect(createdAction).toBe(fileContent);
            });
        });

        describe('Page', () => {
            const answers = {
                fileName: 'Page',
                lowerFileName: 'page',
                upperFileName: 'Page',
                isConnectStore: undefined,
                isPage: true,
                hasStyle: true,
                interfaceName: 'IPage'
            };

            Helper.createClassComponent(answers, params);

            it('should create page/index.tsx', () => {
                const createdPage = String(fs.readFileSync('/pages/page/index.tsx'));

                const fileContent = CommonHelper.getTemplate(
                    '/Templates/nextjs2/Components/Class.mustache',
                    answers
                );

                expect(createdPage).toBe(fileContent);
            });
        });
    });

    describe('createFunctionalComponent', () => {
        const answers = {
            fileName: 'Functest',
            hasStyle: true,
            lowerFileName: 'functest',
            interfaceName: 'IFunctest'
        };

        const createFunctionalComponentParams = {
            indexTemplatePath: '/Templates/nextjs2/Components/index.mustache',
            templatePath: '/Templates/nextjs2/Components/Functional.mustache',
            componentsDir: '/src/Components',
            createInterfaceParams,
            componentTestTemplatePath: '/Templates/nextjs2/Tests/ComponentTest.mustache'
        };

        it('should create functional component dir and file', () => {
            Helper.createFuncComponent(answers, createFunctionalComponentParams);

            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Components/Functional.mustache',
                answers
            );
            const createdComponent = String(fs.readFileSync('/src/Components/Functest/index.tsx'));

            expect(createdComponent).toBe(fileContent);
        });

        it('should add to index', () => {
            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Components/index.mustache',
                answers
            );
            const createdComponent = String(fs.readFileSync('/src/Components/index.ts'));

            expect(createdComponent).toMatch(fileContent);
        });

        it('should create interface', () => {
            const fileContent = CommonHelper.getTemplate(
                '/Templates/nextjs2/Interfaces/Component.mustache',
                answers
            );
            const interfaceFilePath = `${Config.nextjs2.compInterfaceDir}/${answers.fileName}.d.ts`;
            const createdInterface = String(fs.readFileSync(interfaceFilePath));

            expect(createdInterface).toBe(fileContent);
        });
    });
});
