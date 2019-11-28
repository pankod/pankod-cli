// #region Global Imports
import { QuestionCollection, Question } from "inquirer";
// #region Global Imports

// #region Local Imports
import { ICommon } from ".";
// #region Local Imports

export type SvelteElement = 'Component' | 'Test';

export interface ISvelteQuestions {
    Component: QuestionCollection<ICommon.IAnswers>;
    [key: string]: QuestionCollection<ICommon.IAnswers>;
}

export interface ISvelteActions {
    Component: Function;
    [key: string]: Function;
}

export declare namespace ISvelteHelper {
    export interface ICreateStyle {
        templatePath: string;
        compDirPath: string;
    }

    export interface ICreateComponentParams {
        templatePath: string;
        componentsDir: string;
    }
}
