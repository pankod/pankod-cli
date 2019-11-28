// #region Local Imports
import {
    getTemplate,
    isAlreadyExist,
    writeFile,
    addToIndex
} from '../../operations';
import { ICommon } from '../../../../typings';
import { moleculer } from '../../../../paths';
import { createServiceParams } from '../../params/moleculer.params';
import {
    createServiceHelper,
    createInterface,
    createTest,
    createIntegrationTest,
    addBrokerHelper
} from '.';
// #endregion Local Imports

export const createService = (options: ICommon.IAnswers): void => {
    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.servicesDir}/index.ts`,
        getFileContent: () =>
            getTemplate(createServiceParams.indexTemplate, options),
        message: 'Service added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.servicesDir}/${options.lowerFileName}.service.ts`,
        getFileContent: () =>
            getTemplate(createServiceParams.templatePath, options),
        message: 'Added new Service.'
    };

    const serviceTestParams = {
        ...options,
        dirPath: `${moleculer.servicesTestDir}/${options.lowerFileName}.spec.ts`,
        successMessage: 'Added new Microservice test.',
        templatePath: createServiceParams.testTemplatePath,
    };

    const integrationTestParams = {
        ...options,
        dirPath: `${moleculer.integrationTestDir}/${options.lowerFileName}.spec.ts`,
        successMessage: 'Added new Integration test.',
        templatePath: createServiceParams.integrationTemplatePath,
    };

    if (!isAlreadyExist(moleculer.interfaceDir, options.upperFileName, true)) {
        createInterface(options, 'Services', 'Service');
    }

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createServiceHelper(options);
    createTest(serviceTestParams);
    createIntegrationTest(integrationTestParams);
    addBrokerHelper(options);
};
