import { ICommon } from '../ICommon';
import { IMoleculerHelper } from './IMoleculerTypes';
export declare const Helper: {
    addBrokerHelper: (answers: ICommon.IAnswers, brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams) => void;
    createEntityInstance: (answers: ICommon.IAnswers, createEntityHelperParams: IMoleculerHelper.ICreateEntityHelperParams) => void;
    createParamsForAddBrokerHelper: (type: string, brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams, answers: ICommon.IAnswers) => ICommon.IReplaceContent;
    createRepository: (answers: ICommon.IAnswers, createRepositoryParams: IMoleculerHelper.ICreateRepositoryParams) => void;
    createService: (answers: ICommon.IAnswers, createServiceParams: IMoleculerHelper.ICreateServiceParams) => void;
    createServiceHelper: (answers: ICommon.IAnswers, createServiceHelperParams: IMoleculerHelper.ICreateServiceHelperParams) => void;
    createIntegrationTest: (options: ICommon.ICreateTest) => void;
    createInterface: (answers: ICommon.IAnswers, dirType: string, prefix: string | undefined, createInterfaceParams: IMoleculerHelper.ICreateInterfaceParams) => void;
    createTest: (options: ICommon.ICreateTest) => void;
};
