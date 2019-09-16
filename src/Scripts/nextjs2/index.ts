//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { PluginHelper } from '../../Plugins/nextjs/helpers';
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import {
    INextjs2Actions,
    INextjs2CommonQuestions,
    INextjs2Questions,
    INextjs2Helper
} from './INextjs2Types';
import { Helper } from './helper';
import { Plugins } from './pluginsEnum';
//#endregion Local Imports

const createInterfaceParams: INextjs2Helper.ICreateInterfaceParams = {
    templatePath: Config.nextjs2.templates.createInterfaceTempPath,
    pageInterfaceIndex: Config.nextjs2.templates.pageInterfaceIndex,
    storeImportInterface: Config.nextjs2.templates.storeImportInterface,
    compInterfaceIndex: Config.nextjs2.templates.compInterfaceIndex,
    storeInterface: Config.nextjs2.templates.storeInterface,
    interfaceDir: Config.nextjs2.interfaceDir,
    reduxInterfaceDir: Config.nextjs2.reduxInterfaceDir,
    pageInterfaceDir: Config.nextjs2.pageInterfaceDir,
    compInterfaceDir: Config.nextjs2.compInterfaceDir,
    componentsDir: Config.nextjs2.componentsDir
};

const addActionConstIndexParams: INextjs2Helper.IAddActionConstIndexParams = {
    actionConstTemplatePath: Config.nextjs2.templates.actionConstTemplatePath
};

const addActionParams: INextjs2Helper.IAddActionParams = {
    actionIndexTemplatePath: Config.nextjs2.templates.actionIndexTemplatePath,
    actionTemplatePath: Config.nextjs2.templates.actionTemplatePath,
    actionTestTemplatePath: Config.nextjs2.templates.actionTestTemplatePath
};

const addReducerParams: INextjs2Helper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: Config.nextjs2.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: Config.nextjs2.templates.reducerStoreTemplatePath,
    reducerTemplatePath: Config.nextjs2.templates.reducerTemplatePath
};

const commonQuestions: INextjs2CommonQuestions = {
    /*     addStyle: {
        default: true,
        message: 'Do you want to add style file?',
        name: 'hasStyle',
        type: 'confirm'
    }, */

    addStyle: {
        choices: [
            new inquirer.Separator(),
            {
                name: 'styled-components',
                value: 'styled'
            },
            {
                name: 'SCSS/SASS',
                value: 'scss'
            },
            {
                name: "I don't want to add style file.",
                value: 'noStyle'
            }
        ],
        message: 'What kind of css do you want to implement?',
        name: 'hasStyle',
        type: 'list'
    },
    connectStore: {
        default: false,
        message: 'Do you want to connect store ?',
        name: 'isConnectStore',
        type: 'confirm'
    },
    enterComponentName: {
        message: 'Enter component name',
        name: 'fileName',
        type: 'input',
        validate(val: string): string | boolean {
            return CommonHelper.validate(val, Config.nextjs2.componentsDir, false, 'component');
        }
    },
    isHaveReducer: {
        choices: [
            new inquirer.Separator(),
            {
                name: 'Yes, I want to have new reducer.',
                value: true
            },
            {
                name: 'No, do not create a new reducer.',
                value: false
            }
        ],
        message: 'Do you want to create a new reducer or use your own?',
        name: 'isHaveReducer',
        type: 'list',
        when: ({ isConnectStore = false }: { isConnectStore?: boolean }): boolean => isConnectStore
    }
};

const questions: INextjs2Questions = {
    ClassComponent: [
        commonQuestions.enterComponentName,
        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ],
    FunctionalComponent: [commonQuestions.enterComponentName, commonQuestions.addStyle],
    Page: [
        {
            message: 'Enter page name',
            name: 'fileName',
            type: 'input',
            validate(val: string): string | boolean {
                return CommonHelper.validate(val, Config.nextjs2.pagesDir, false, 'page');
            }
        },
        {
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Yes, I want to add custom path?',
                    value: true
                },
                {
                    name: 'No, use default.',
                    value: false
                }
            ],
            message: 'Do you want to add custom route or use default route name?',
            name: 'hasPath',
            type: 'list'
        },
        {
            message: 'Enter route name',
            name: 'routePath',
            type: 'input',
            when: ({ hasPath = false }: { hasPath?: boolean }): boolean => hasPath
        },

        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ],
    Plugin: [
        {
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Styled Components',
                    value: Plugins.styled
                },
                {
                    name: 'Sass',
                    value: Plugins.sass
                }
            ],
            message: 'What plugin do you want to add?',
            name: 'pluginType',
            type: 'list'
        }
    ]
};

const createClassComponentParams: INextjs2Helper.ICreateClassComponentParams = {
    templatePath: Config.nextjs2.templates.classComponentTemplatePath,
    indexTemplatePath: Config.nextjs2.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};

const createFuncComponentParams: INextjs2Helper.ICreateFuncComponentParams = {
    templatePath: Config.nextjs2.templates.funcComponentTemplate,
    indexTemplatePath: Config.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: Config.nextjs2.componentsDir,
    createInterfaceParams
};

const createStyledFuncComponentParams: INextjs2Helper.ICreateFuncComponentParams = {
    templatePath: Config.nextjs2.templates.styledFuncComponentTemplate,
    indexTemplatePath: Config.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: Config.nextjs2.componentsDir,
    createInterfaceParams
};

const createStyleParams: INextjs2Helper.ICreateStyle = {
    compDirPath: Config.nextjs2.componentsDir,
    pageDirPath: Config.nextjs2.pagesDir,
    templatePath: Config.nextjs2.templates.stylePageTemplate
};

const createStyledComponentParams: INextjs2Helper.ICreateStyle = {
    compDirPath: Config.nextjs2.componentsDir,
    pageStyledDirPath: Config.nextjs2.pageStyledDir,
    templatePath: Config.nextjs2.templates.styledComponentsTemplatePath,
    isStyledComponent: true
};

const actions: INextjs2Actions = {
    ClassComponent: async (answers: ICommon.IAnswers): Promise<void> => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

        Helper.createClassComponent(answers, createClassComponentParams);

        if (hasStyle) {
            Helper.createStyle(answers, createStyleParams);
        }
    },
    FunctionalComponent: async (answers: ICommon.IAnswers): Promise<void> => {
        const { hasStyle = 'noStyle' } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isFuncComponent = true;

        switch (hasStyle) {
            case 'styled':
                Helper.createFuncComponent(answers, createStyledFuncComponentParams);
                Helper.createStyle(answers, createStyledComponentParams);
                break;
            case 'scss':
                answers.isScss = true;
                Helper.createFuncComponent(answers, createFuncComponentParams);
                Helper.createStyle(answers, createStyleParams);
                break;
            default:
                break;
        }

        Helper.createInterface(answers, false, createInterfaceParams);
    },
    Page: async (answers: ICommon.IAnswers): Promise<void> => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isPage = true;

        const addRouteParams = {
            routesDir: Config.nextjs2.routesDir,
            routesTemplate: Config.nextjs2.templates.addRouteTemplate
        };

        answers.isStyled = answers.hasStyle === 'styled';
        answers.isScss = answers.hasStyle === 'scss';

        Helper.createClassComponent(answers, createClassComponentParams);
        Helper.addRoute(answers, addRouteParams);

        switch (hasStyle) {
            case 'styled':
                Helper.createStyle(answers, createStyledComponentParams);
                break;
            case 'scss':
                Helper.createStyle(answers, createStyleParams);
                break;
            default:
                break;
        }
    },
    Plugin: async (answers: ICommon.IAnswers): Promise<void> => {
        const { pluginType = Plugins.styled } = answers;

        PluginHelper[pluginType]();
    }
};

export default {
    showQuestions: async (type: string): Promise<void> => {
        const componentType = type.replace(' ', '');

        const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(
            questions[componentType]
        );

        actions[componentType](answers);
    }
};
