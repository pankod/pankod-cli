// #region Local Imports
import { ICommon } from '../../../../typings';
import { replaceContent } from '../../operations';
import { createParamsForAddBrokerHelper } from '.';
// #endregion Local Imports

export const addBrokerHelper = (options: ICommon.IAnswers): void => {
    const interoperations: ['import', 'create'] = ['import', 'create'];

    interoperations.forEach(operation => {
        replaceContent(createParamsForAddBrokerHelper(operation, options));
    });
};
