import { ICommon } from '../ICommon';
import { INextjsHelper } from './INextjsTypes';
export declare const Helper: {
    addRoute: (answers: ICommon.IAnswers, IAddRoutesReplaceParams: INextjsHelper.IAddRoutesReplaceParams) => void;
    createInterface: (answers: ICommon.IAnswers, isClass: boolean, createInterfaceParams: INextjsHelper.ICreateInterfaceParams) => void;
    createStyle: (answers: ICommon.IAnswers, createStyleParams: INextjsHelper.ICreateStyle) => void;
    addActionConstIndex: (templateProps: ICommon.ITemplateProps, params: INextjsHelper.IAddActionConstIndexParams) => void;
    addAction: (answers: ICommon.IAnswers, params: INextjsHelper.IAddActionParams) => void;
    addReducer: (answers: ICommon.IAnswers, params: INextjsHelper.IAddReducerParams) => void;
    createClassComponent: (answers: ICommon.IAnswers, params: INextjsHelper.ICreateClassComponentParams) => void;
    createFuncComponent: (answers: ICommon.IAnswers, params: INextjsHelper.ICreateFuncComponentParams) => void;
};
