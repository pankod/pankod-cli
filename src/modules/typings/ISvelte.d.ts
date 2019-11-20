// #region Global Imports
import { Question } from "inquirer";
// #region Global Imports

// #region Local Imports
import { ICommon } from ".";
// #region Local Imports

export type SvelteElement = 'component';

export interface ISvelteQuestions {
    Component: Question<ICommon.IAnswers>[];
    [key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
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
