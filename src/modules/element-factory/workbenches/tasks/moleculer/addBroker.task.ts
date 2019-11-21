// #region Local Imports
import { replaceContent } from '../../operations';
import { ICommon, IMoleculerHelper } from '../../../../typings';
import { createParamsForAddBrokerHelper } from '.';
// #endregion Local Imports

export const addBrokerHelper = (
    answers: ICommon.IAnswers,
    brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams
): void => {
    setTimeout(() => {
        replaceContent(
            createParamsForAddBrokerHelper(
                'create',
                brokerHelperTemplatesParams,
                answers
            )
        );
    }, 100);

    replaceContent(
        createParamsForAddBrokerHelper(
            'import',
            brokerHelperTemplatesParams,
            answers
        )
    );
};
