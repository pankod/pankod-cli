// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { CommonHelper } from '../../Common';
import { IMoleculerHelper } from '../IMoleculerTypes';
import { ICommon } from '../../ICommon';
// #endregion Local Imports

export const createParamsForAddBrokerHelper = (
    type: string,
    brokerHelperTemplatesParams: IMoleculerHelper.IBrokerHelperTemplatesParams,
    answers: ICommon.IAnswers
): ICommon.IReplaceContent => {
    const templateProps = {
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };

    const replaceBrokerParams: ICommon.IReplaceContent = {
        fileDir: brokerHelperTemplatesParams.replaceFileDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', brokerHelperTemplatesParams.replaceFileDir),
            'utf8'
        ),
        getFileContent: () =>
            CommonHelper.getTemplate(
                type === 'import'
                    ? brokerHelperTemplatesParams.brokerHelperImport
                    : brokerHelperTemplatesParams.brokerHelperCreate,
                templateProps
            ),
        message:
            type === 'import'
                ? 'Service added to BrokerHelper Import'
                : 'Service added to BrokerHelper setupBroker.\n',
        regexKey: type === 'import' ? /\/\/ #endregion Local Imports/g : /^\s*return broker;/gm
    };

    return replaceBrokerParams;
};
