"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const _1 = require(".");
// #endregion Local Imports
exports.addBrokerHelper = (answers, brokerHelperTemplatesParams) => {
    setTimeout(() => {
        operations_1.replaceContent(_1.createParamsForAddBrokerHelper('create', brokerHelperTemplatesParams, answers));
    }, 100);
    operations_1.replaceContent(_1.createParamsForAddBrokerHelper('import', brokerHelperTemplatesParams, answers));
};
