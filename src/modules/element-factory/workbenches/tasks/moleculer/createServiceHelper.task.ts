import { ICommon } from '../../../../typings';
import { moleculer } from '../../../../paths/moleculer.paths';
import { getTemplate, writeFile, addToIndex } from '../../operations';
import { createTest } from '.';
import { createServiceHelperParams } from '../../params/moleculer.params';

export const createServiceHelper = (options: ICommon.IAnswers): void => {
    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.servicesHelperDir}/${options.upperFileName}Helper.ts`,
        getFileContent: () =>
            getTemplate(createServiceHelperParams.templatePath, options),
        message: 'Added new Service Helper'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.servicesHelperDir}/index.ts`,
        getFileContent: () =>
            getTemplate(createServiceHelperParams.indexTemplate, options),
        message: 'Service Helper added to index.ts.'
    };

    const serviceHelperTestParams = {
        ...options,
        dirPath: `${moleculer.serviceHelperTestDir}/${options.upperFileName}Helper.spec.ts`,
        successMessage: 'Added new Micro Service Helper test.',
        templatePath: createServiceHelperParams.testTemplatePath,
    };

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createTest(serviceHelperTestParams);
};
