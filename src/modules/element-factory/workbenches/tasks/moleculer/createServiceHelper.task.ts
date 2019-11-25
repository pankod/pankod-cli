import { ICommon } from '../../../../typings';
import { moleculer } from '../../../../paths/moleculer.paths';
import { getTemplate, writeFile, addToIndex } from '../../operations';
import { createTest } from '.';
import { createServiceHelperParams } from '../../params/moleculer.params';

export const createServiceHelper = (answers: ICommon.IAnswers): void => {
    const templateProps = {
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
        getFileContent: () =>
            getTemplate(createServiceHelperParams.templatePath, templateProps),
        message: 'Added new Service Helper'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.servicesHelperDir}/index.ts`,
        getFileContent: () =>
            getTemplate(createServiceHelperParams.indexTemplate, templateProps),
        message: 'Service Helper added to index.ts.'
    };

    const serviceHelperTestParams = {
        answers,
        dirPath: `${moleculer.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
        successMessage: 'Added new Micro Service Helper test.',
        templatePath: createServiceHelperParams.testTemplatePath,
        templateProps
    };

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createTest(serviceHelperTestParams);
};
