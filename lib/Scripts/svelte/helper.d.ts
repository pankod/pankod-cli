import { ICommon } from '../ICommon';
import { ISvelteHelper } from './ISvelteTypes';
export declare const Helper: {
    createStyle: (answers: ICommon.IAnswers, createStyleParams: ISvelteHelper.ICreateStyle) => void;
    createComponent: (answers: ICommon.IAnswers, params: ISvelteHelper.ICreateComponentParams) => void;
    createTest: (options: ICommon.ICreateTest) => void;
};
