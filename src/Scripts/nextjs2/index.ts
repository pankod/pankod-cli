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

        Helper.createFuncComponent(options);
    },

    Plugin: async (answers: ICommon.IAnswers): Promise<void> => {
        if (answers.pluginType) PluginHelper[answers.pluginType]();
    }
};

export default {
    showQuestions: async (type: string): Promise<void> => {
        const elementType = type.replace(' ', '');

        const answers: ICommon.IAnswers = await inquirer.prompt<ICommon.IAnswers>(
            getQuestionsByElementType(elementType)
        );

        actions[elementType](answers);
    }
};
