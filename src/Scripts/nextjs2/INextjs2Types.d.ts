import { InputQuestion, Question, ConfirmQuestion, ListQuestion } from 'inquirer';
import { ICommon } from '../ICommon';

export interface INextjs2CommonQuestions {
    addStyle: ListQuestion<ICommon.IAnswers>;
    connectStore: ConfirmQuestion<ICommon.IAnswers>;
    enterComponentName: InputQuestion<ICommon.IAnswers>;
    isHaveReducer: ListQuestion<ICommon.IAnswers>;
}

export interface INextjs2Questions {
    Plugin: Question<ICommon.IAnswers>[];
    ClassComponent: Question<ICommon.IAnswers>[];
    FunctionalComponent: Question<ICommon.IAnswers>[];
    Page: Question<ICommon.IAnswers>[];
    [key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
}

export interface INextjs2Actions {
    ClassComponent: Function;
    FunctionalComponent: Function;
    Page: Function;
    Plugin: Function;
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
    }

    export interface IAddReducerParams {
        reducerIndexTemplatePath: string;
        reducerTemplatePath: string;
        reducerStoreTemplatePath: string;
        addActionConstIndexParams: IAddActionConstIndexParams;
    }

    export interface IAddActionConstIndexParams {
        actionConstTemplatePath: string;
    }

    export interface IAddActionParams {
        actionTemplatePath: string;
        actionIndexTemplatePath: string;
        actionTestTemplatePath: string;
    }

    export interface ICreateFuncComponentParams {
        templatePath: string;
        indexTemplatePath: string;
        componentsDir: string;
    }
}
