"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const inquirer = require("inquirer");
//#region Global Imports
//#region Local Imports
const helpers_1 = require("../../Plugins/nextjs/helpers");
const config_1 = require("../../config");
const Common_1 = require("../Common");
const helper_1 = require("./helper");
const pluginsEnum_1 = require("./pluginsEnum");
//#endregion Local Imports
const createInterfaceParams = {
    templatePath: config_1.Config.nextjs2.templates.createInterfaceTempPath,
    pageInterfaceIndex: config_1.Config.nextjs2.templates.pageInterfaceIndex,
    storeImportInterface: config_1.Config.nextjs2.templates.storeImportInterface,
    compInterfaceIndex: config_1.Config.nextjs2.templates.compInterfaceIndex,
    storeInterface: config_1.Config.nextjs2.templates.storeInterface,
    interfaceDir: config_1.Config.nextjs2.interfaceDir,
    reduxInterfaceDir: config_1.Config.nextjs2.reduxInterfaceDir,
    pageInterfaceDir: config_1.Config.nextjs2.pageInterfaceDir,
    compInterfaceDir: config_1.Config.nextjs2.compInterfaceDir,
    componentsDir: config_1.Config.nextjs2.componentsDir
};
const addActionConstIndexParams = {
    actionConstTemplatePath: config_1.Config.nextjs2.templates.actionConstTemplatePath
};
const addActionParams = {
    actionIndexTemplatePath: config_1.Config.nextjs2.templates.actionIndexTemplatePath,
    actionTemplatePath: config_1.Config.nextjs2.templates.actionTemplatePath,
    actionTestTemplatePath: config_1.Config.nextjs2.templates.actionTestTemplatePath
};
const addReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: config_1.Config.nextjs2.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: config_1.Config.nextjs2.templates.reducerStoreTemplatePath,
    reducerTemplatePath: config_1.Config.nextjs2.templates.reducerTemplatePath,
    reducerTestTemplatePath: config_1.Config.nextjs2.templates.reducerTestTemplatePath
};
const commonQuestions = {
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
        validate(val) {
            return Common_1.CommonHelper.validate(val, config_1.Config.nextjs2.componentsDir, false, 'component');
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
        when: ({ isConnectStore = false }) => isConnectStore
    }
};
const questions = {
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
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.nextjs2.pagesDir, false, 'page');
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
            when: ({ hasPath = false }) => hasPath
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
                    value: pluginsEnum_1.Plugins.styled
                },
                {
                    name: 'Sass',
                    value: pluginsEnum_1.Plugins.sass
                }
            ],
            message: 'What plugin do you want to add?',
            name: 'pluginType',
            type: 'list'
        }
    ]
};
const createClassComponentParams = {
    templatePath: config_1.Config.nextjs2.templates.classComponentTemplatePath,
    indexTemplatePath: config_1.Config.nextjs2.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};
const createFuncComponentParams = {
    templatePath: config_1.Config.nextjs2.templates.funcComponentTemplate,
    indexTemplatePath: config_1.Config.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: config_1.Config.nextjs2.componentsDir,
    createInterfaceParams
};
const createStyledFuncComponentParams = {
    templatePath: config_1.Config.nextjs2.templates.styledFuncComponentTemplate,
    indexTemplatePath: config_1.Config.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: config_1.Config.nextjs2.componentsDir,
    createInterfaceParams
};
const createStyleParams = {
    compDirPath: config_1.Config.nextjs2.componentsDir,
    pageDirPath: config_1.Config.nextjs2.pagesDir,
    templatePath: config_1.Config.nextjs2.templates.stylePageTemplate
};
const createStyledComponentParams = {
    compDirPath: config_1.Config.nextjs2.componentsDir,
    pageStyledDirPath: config_1.Config.nextjs2.pageStyledDir,
    templatePath: config_1.Config.nextjs2.templates.styledComponentsTemplatePath,
    isStyledComponent: true
};
const actions = {
    ClassComponent: async (answers) => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        helper_1.Helper.createClassComponent(answers, createClassComponentParams);
        if (hasStyle) {
            helper_1.Helper.createStyle(answers, createStyleParams);
        }
    },
    FunctionalComponent: async (answers) => {
        const { hasStyle = 'noStyle' } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isFuncComponent = true;
        switch (hasStyle) {
            case 'styled':
                helper_1.Helper.createFuncComponent(answers, createStyledFuncComponentParams);
                helper_1.Helper.createStyle(answers, createStyledComponentParams);
                break;
            case 'scss':
                answers.isScss = true;
                helper_1.Helper.createFuncComponent(answers, createFuncComponentParams);
                helper_1.Helper.createStyle(answers, createStyleParams);
                break;
            default:
                break;
        }
        helper_1.Helper.createInterface(answers, false, createInterfaceParams);
    },
    Page: async (answers) => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isPage = true;
        const addRouteParams = {
            routesDir: config_1.Config.nextjs2.routesDir,
            routesTemplate: config_1.Config.nextjs2.templates.addRouteTemplate
        };
        answers.isStyled = answers.hasStyle === 'styled';
        answers.isScss = answers.hasStyle === 'scss';
        helper_1.Helper.createClassComponent(answers, createClassComponentParams);
        helper_1.Helper.addRoute(answers, addRouteParams);
        switch (hasStyle) {
            case 'styled':
                helper_1.Helper.createStyle(answers, createStyledComponentParams);
                break;
            case 'scss':
                helper_1.Helper.createStyle(answers, createStyleParams);
                break;
            default:
                break;
        }
    },
    Plugin: async (answers) => {
        const { pluginType = pluginsEnum_1.Plugins.styled } = answers;
        helpers_1.PluginHelper[pluginType]();
    }
};
exports.default = {
    showQuestions: async (type) => {
        const componentType = type.replace(' ', '');
        const answers = await inquirer.prompt(questions[componentType]);
        actions[componentType](answers);
    }
};
