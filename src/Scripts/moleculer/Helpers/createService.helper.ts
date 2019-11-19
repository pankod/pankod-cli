// #region Local Imports
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';
import { createServiceParams } from '../moleculer.config';
import * as Helpers from '.';
// #endregion Local Imports

export const createService = (answers: ICommon.IAnswers): void => {
    const templateProps = {
        fileName: answers.fileName,
        hasDatabase: answers.hasDatabase,
        isPrivate: answers.isPrivate,
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${Config.moleculer.servicesDir}/index.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createServiceParams.indexTemplate, templateProps),
        message: 'Service added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${Config.moleculer.servicesDir}/${answers.lowerFileName}.service.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createServiceParams.templatePath, templateProps),
        message: 'Added new Service.'
    };

    const serviceTestParams = {
        answers,
        dirPath: `${Config.moleculer.servicesTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Microservice test.',
        templatePath: createServiceParams.testTemplatePath,
        templateProps
    };

    const integrationTestParams = {
        answers,
        dirPath: `${Config.moleculer.integrationTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Integration test.',
        templatePath: createServiceParams.integrationTemplatePath,
        templateProps
    };

    if (!CommonHelper.isAlreadyExist(Config.moleculer.interfaceDir, answers.upperFileName, true)) {
        Helpers.createInterface(
            answers,
            'Services',
            'Service',
            createServiceParams.createInterfaceParams
        );
    }

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
    Helpers.createService(answers);
    Helpers.createTest(serviceTestParams);
    Helpers.createIntegrationTest(integrationTestParams);
    Helpers.addBrokerHelper(answers, createServiceParams.brokerHelperTemplatesParams);
};
