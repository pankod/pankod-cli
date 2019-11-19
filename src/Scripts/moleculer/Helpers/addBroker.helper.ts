// #region Local Imports
import { CommonHelper } from '../../Common';
import { IMoleculerHelper } from '../IMoleculerTypes';
import { ICommon } from '../../ICommon';
import * as Helpers from '.';
// #endregion Local Imports

export const addBrokerHelper = (
    answers: ICommon.IAnswers,
    brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams
): void => {
    setTimeout(() => {
        CommonHelper.replaceContent(
            Helpers.createParamsForAddBrokerHelper('create', brokerHelperTemplatesParams, answers)
        );
    }, 100);

    CommonHelper.replaceContent(
        Helpers.createParamsForAddBrokerHelper('import', brokerHelperTemplatesParams, answers)
    );
};
