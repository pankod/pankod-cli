// #region Global Imports
import {
    QuestionCollection,
    InputQuestion,
    Question,
    ConfirmQuestion,
    ListQuestion
} from 'inquirer';
// #region Global Imports

// #region Local Imports
import { ICommon } from '.';
// #region Local Imports

export type Next2Element = 'Page' | 'ClassComponent' | 'FunctionalComponent';

export interface INextjs2CommonQuestions {
    addStyle: ListQuestion<ICommon.IAnswers>;
    connectStore: ConfirmQuestion<ICommon.IAnswers>;
    enterComponentName: InputQuestion<ICommon.IAnswers>;
    isHaveReducer: ListQuestion<ICommon.IAnswers>;
}

export interface INextjs2Questions {
    Plugin: QuestionCollection<ICommon.IAnswers>;
    ClassComponent: QuestionCollection<ICommon.IAnswers>;
    FunctionalComponent: QuestionCollection<ICommon.IAnswers>;
    Page: QuestionCollection<ICommon.IAnswers>;
    [key: string]: QuestionCollection<ICommon.IAnswers>;
}

export interface INextjs2Actions {
    ClassComponent: Function;
    FunctionalComponent: Function;
    Page: Function;
    // Plugin: Function;
    [key: string]: Function;
}

export declare namespace INextjs2Helper {
    export interface IAddRoutesReplaceParams {
        routesDir: string;
        routesTemplate: string;
    }

    export interface ICreateInterfaceParams {
        templatePath: string;
        pageInterfaceDir: string;
        compInterfaceDir: string;
        pageInterfaceIndex: string;
        compInterfaceIndex: string;
        storeInterface: string;
        storeImportInterface: string;
        interfaceDir: string;
        reduxInterfaceDir: string;
        componentsDir: string;
    }

    export interface ICreateStyle {
        templatePath: string;
        pageDirPath?: string;
        compDirPath: string;
        pageStyledDirPath?: string;
        isStyledComponent?: boolean;
    }

    export interface ICreateClassComponentParams {
        templatePath: string;
        indexTemplatePath: string;
        createInterfaceParams: ICreateInterfaceParams;
        addReducerParams: IAddReducerParams;
        addActionParams: IAddActionParams;
    }

    export interface ICreateFuncComponentParams {
        createInterfaceParams: ICreateInterfaceParams;
        templatePath: string;
        indexTemplatePath: string;
        componentsDir: string;
        componentTestTemplatePath: string;
    }

    export interface IAddReducerParams {
        reducerIndexTemplatePath: string;
        reducerTemplatePath: string;
        reducerStoreTemplatePath: string;
        addActionConstIndexParams: IAddActionConstIndexParams;
        reducerTestTemplatePath: string;
    }

    export interface IAddActionConstIndexParams {
        actionConstTemplatePath: string;
        actionConstsFileDir: string;
    }

    export interface IAddActionParams {
        actionTemplatePath: string;
        actionIndexTemplatePath: string;
        actionTestTemplatePath: string;
    }
}
