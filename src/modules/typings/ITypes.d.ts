// #region Global Imports
import { ListQuestion } from "inquirer";
// #region Global Imports

// #region Local Imports
import { ICommon } from ".";
// #region Local Imports

export interface IPankodConfig {
    project: string;
    plugins: string[];
}

export interface IText {
    moleculer: string;
    nextjs: string;
    svelte: string;
    nextjs2: string;
    pankodCli: string;
    [key: string]: string;
}

export interface IQuestions {
    moleculer: ListQuestion<ICommon.IAnswers>;
    nextjs: ListQuestion<ICommon.IAnswers>;
    svelte: ListQuestion<ICommon.IAnswers>;
    nextjs2: ListQuestion<ICommon.IAnswers>;
    [key: string]: ListQuestion<ICommon.IAnswers>;
}

export interface IQuestionsHelper {
    default: {
        showQuestions: Function;
    };
}

export interface IPluginsHelper {
    default: {
        addPlugin: Function;
    };
}

export interface ISupportedCommands {
    moleculer: string[];
    nextjs: string[];
    svelte: string[];
    nextjs2: string[];
    [key: string]: string[];
}
