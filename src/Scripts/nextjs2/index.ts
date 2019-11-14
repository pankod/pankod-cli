// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import { Helper } from './helper';
import { ICommon } from '../ICommon';
import { INextjs2Actions } from './INextjs2Types';
import { PluginHelper } from '../../Plugins/nextjs/helpers';
import { getQuestionsByElementType } from './questions';
// #endregion Local Imports

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

const createElement = (elementType: ICommon.ElementType, answers: ICommon.IAnswers) => {
    const options = prepareOptions(answers);

    const factory: INextjs2Actions = {
        Page: () => {
            Helper.createClassComponent({ ...options, isPage: true });
        },

        ClassComponent: () => {
            Helper.createClassComponent(options);
        },

        FunctionalComponent: () => {
            Helper.createFuncComponent({ ...options, isFuncComponent: true });
        },

        Plugin: () => {
            if (answers.pluginType) PluginHelper[answers.pluginType]();
        }
    };

    factory[elementType]();
};

export default {
    showQuestions: async (elementType: ICommon.ElementType): Promise<void> => {
        const questions = getQuestionsByElementType(elementType);

        const answers = await inquirer.prompt<ICommon.IAnswers>(questions);

        createElement(elementType, answers);
    }
};
