// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import { PluginHelper } from '../../Plugins/nextjs/helpers';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
import {
    INextjs2Actions,
    INextjs2CommonQuestions,
    INextjs2Questions
} from './INextjs2Types';
import { Helper } from './helper';
import { Plugins } from './pluginsEnum';
// #endregion Local Imports

const commonQuestions: INextjs2CommonQuestions = {
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
        default: 'noStyle',
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
    ClassComponent: [...Object.values(commonQuestions)],
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
            default: false,
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
            default: Plugins.styled,
            message: 'What plugin do you want to add?',
            name: 'pluginType',
            type: 'list'
        }
    ]
};

const prepareOptions = (answers: ICommon.IAnswers, custom?: object) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, f => f.toUpperCase());
    const unCapitalizedName = answers.fileName.replace(/\b\w/g, f => f.toLowerCase());

    return {
        ...answers,
        fileName: capitalizedName,
        // TODO: Rename 'upperFileName' as 'capitalizedFileName'
        upperFileName: capitalizedName,
        lowerFileName: unCapitalizedName,
        interfaceName: `I${capitalizedName}`,
        ...custom
    };
};

const actions: INextjs2Actions = {
    Page: async (answers: ICommon.IAnswers): Promise<void> => {
        const options = prepareOptions(answers, { isPage: true });

        Helper.createClassComponent(options);
    },
    ClassComponent: async (answers: ICommon.IAnswers): Promise<void> => {
        const options = prepareOptions(answers);

        Helper.createClassComponent(options);
    },
    FunctionalComponent: async (answers: ICommon.IAnswers): Promise<void> => {
        const options = prepareOptions(answers, { isFuncComponent: true });

        // TODO: Clean up leftovers
        // Helper.createInterface(answers);
    },
    Plugin: async (answers: ICommon.IAnswers): Promise<void> => {
        if (answers.pluginType) PluginHelper[answers.pluginType]();
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
