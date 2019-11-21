"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.createParamsForAddBrokerHelper = (type, brokerHelperTemplatesParams, answers) => {
    const templateProps = {
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };
    const replaceBrokerParams = {
        fileDir: brokerHelperTemplatesParams.replaceFileDir,
        filetoUpdate: fs.readFileSync(path.resolve('', brokerHelperTemplatesParams.replaceFileDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(type === 'import'
            ? brokerHelperTemplatesParams.brokerHelperImport
            : brokerHelperTemplatesParams.brokerHelperCreate, templateProps),
        message: type === 'import'
            ? 'Service added to BrokerHelper Import'
            : 'Service added to BrokerHelper setupBroker.\n',
        regexKey: type === 'import'
            ? /\/\/ #endregion Local Imports/g
            : /^\s*return broker;/gm
    };
    return replaceBrokerParams;
};
