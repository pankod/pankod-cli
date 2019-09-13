import { ICommon } from '../ICommon';
import { INextjs2Helper } from './INextjs2Types';
export declare const Helper: {
    addRoute: (answers: ICommon.IAnswers, IAddRoutesReplaceParams: INextjs2Helper.IAddRoutesReplaceParams) => void;
    createInterface: (answers: ICommon.IAnswers, isClass: boolean, createInterfaceParams: INextjs2Helper.ICreateInterfaceParams) => void;
    createStyle: (answers: ICommon.IAnswers, createStyleParams: INextjs2Helper.ICreateStyle) => void;
    addActionConstIndex: (templateProps: ICommon.ITemplateProps, params: INextjs2Helper.IAddActionConstIndexParams) => void;
    addAction: (answers: ICommon.IAnswers, params: INextjs2Helper.IAddActionParams) => void;
    addReducer: (answers: ICommon.IAnswers, params: INextjs2Helper.IAddReducerParams) => void;
    createClassComponent: (answers: ICommon.IAnswers, params: INextjs2Helper.ICreateClassComponentParams) => void;
    createFuncComponent: (answers: ICommon.IAnswers, params: INextjs2Helper.ICreateFuncComponentParams) => void;
};
