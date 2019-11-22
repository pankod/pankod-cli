"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const moleculer_params_1 = require("../../params/moleculer.params");
const _1 = require(".");
// #endregion Local Imports
exports.createService = (answers) => {
    const templateProps = {
        fileName: answers.fileName,
        hasDatabase: answers.hasDatabase,
        isPrivate: answers.isPrivate,
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.servicesDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceParams.indexTemplate, templateProps),
        message: 'Service added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${paths_1.moleculer.servicesDir}/${answers.lowerFileName}.service.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceParams.templatePath, templateProps),
        message: 'Added new Service.'
    };
    const serviceTestParams = {
        answers,
        dirPath: `${paths_1.moleculer.servicesTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Microservice test.',
        templatePath: moleculer_params_1.createServiceParams.testTemplatePath,
        templateProps
    };
    const integrationTestParams = {
        answers,
        dirPath: `${paths_1.moleculer.integrationTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Integration test.',
        templatePath: moleculer_params_1.createServiceParams.integrationTemplatePath,
        templateProps
    };
    if (!operations_1.isAlreadyExist(paths_1.moleculer.interfaceDir, answers.upperFileName, true)) {
        _1.createInterface(answers, 'Services', 'Service', moleculer_params_1.createServiceParams.createInterfaceParams);
    }
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    exports.createService(answers);
    _1.createTest(serviceTestParams);
    _1.createIntegrationTest(integrationTestParams);
    _1.addBrokerHelper(answers, moleculer_params_1.createServiceParams.brokerHelperTemplatesParams);
};
