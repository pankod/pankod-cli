// #region Local Imports
import {
    getTemplate,
    isAlreadyExist,
    writeFile,
    addToIndex
} from '../../operations';
import { ICommon } from '../../../../typings';
import { moleculer } from '../../../../paths';
import { createServiceParams } from '../../params';
import {
    createInterface,
    createTest,
    createIntegrationTest,
    addBrokerHelper
} from '.';
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
        dirPath: `${moleculer.servicesDir}/index.ts`,
        getFileContent: () =>
            getTemplate(createServiceParams.indexTemplate, templateProps),
        message: 'Service added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.servicesDir}/${answers.lowerFileName}.service.ts`,
        getFileContent: () =>
            getTemplate(createServiceParams.templatePath, templateProps),
        message: 'Added new Service.'
    };

    const serviceTestParams = {
        answers,
        dirPath: `${moleculer.servicesTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Microservice test.',
        templatePath: createServiceParams.testTemplatePath,
        templateProps
    };

    const integrationTestParams = {
        answers,
        dirPath: `${moleculer.integrationTestDir}/${answers.lowerFileName}.spec.ts`,
        successMessage: 'Added new Integration test.',
        templatePath: createServiceParams.integrationTemplatePath,
        templateProps
    };

    if (!isAlreadyExist(moleculer.interfaceDir, answers.upperFileName, true)) {
        createInterface(
            answers,
            'Services',
            'Service',
            createServiceParams.createInterfaceParams
        );
    }

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createService(answers);
    createTest(serviceTestParams);
    createIntegrationTest(integrationTestParams);
    addBrokerHelper(answers, createServiceParams.brokerHelperTemplatesParams);
};
