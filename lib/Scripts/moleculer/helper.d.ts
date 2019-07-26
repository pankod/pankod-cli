import { ICommon } from '../ICommon';
export declare const Helper: {
    addBrokerHelper: (answers: ICommon.IAnswers) => void;
    createEntityInstance: (answers: ICommon.IAnswers) => void;
    createRepository: (answers: ICommon.IAnswers) => void;
    createService: (answers: ICommon.IAnswers) => void;
    createServiceHelper: (answers: ICommon.IAnswers) => void;
    createIntegrationTest: (options: ICommon.ICreateTest) => void;
    createInterface: (answers: ICommon.IAnswers, dirType: string, prefix?: string) => void;
    createTest: (options: ICommon.ICreateTest) => void;
};
