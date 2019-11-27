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

export type Next2Element = 'Page' | 'Component';

export interface INextjs2Questions {
    Page: QuestionCollection<ICommon.IAnswers>;
    Component: QuestionCollection<ICommon.IAnswers>;
    // Plugin: QuestionCollection<ICommon.IAnswers>;
    [key: string]: QuestionCollection<ICommon.IAnswers>;
}

export interface INextjs2Actions {
    Page: Function;
    Component: Function;
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
        storeImportInterfaceFormatted: string;
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
        componentsDir: string;
        addReducerParams: IAddReducerParams;
        addActionParams: IAddActionParams;
        componentTestTemplatePath: string;
    }

    export interface ICreateFuncComponentParams {
        templatePath: string;
        indexTemplatePath: string;
        createInterfaceParams: ICreateInterfaceParams;
        componentsDir: string;
        addReducerParams: IAddReducerParams;
        addActionParams: IAddActionParams;
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
