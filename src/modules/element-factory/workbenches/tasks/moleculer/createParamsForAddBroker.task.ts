// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { getTemplate } from '../../operations';
import { ICommon } from '../../../../typings';
import { createServiceParams } from '../../params/moleculer.params';
// #endregion Local Imports

export const createParamsForAddBrokerHelper = (
    type: 'import' | 'create',
    options: ICommon.IAnswers
): ICommon.IReplaceContent => {
    const {
        replaceFileDir,
        brokerHelperCreate,
        brokerHelperImport
    } = createServiceParams.brokerHelperTemplatesParams;

    const interoperationPayloads = {
        import: {
            template: brokerHelperImport,
            regexKey: /\/\/(?: |)#endregion Local Imports/g,
            message: 'Service added to BrokerHelper Import'
        },

        create: {
            template: brokerHelperCreate,
            regexKey: /^\s*return broker;/gm,
            message: 'Service added to BrokerHelper setupBroker.\n'
        }
    };

    const replaceBrokerParams: ICommon.IReplaceContent = {
        fileDir: replaceFileDir,
        filetoUpdate: fs.readFileSync(path.resolve('', replaceFileDir), 'utf8'),
        getFileContent: () =>
            getTemplate(interoperationPayloads[type].template, options),
        message: interoperationPayloads[type].message,
        regexKey: interoperationPayloads[type].regexKey
    };

    return replaceBrokerParams;
};
