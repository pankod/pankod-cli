// #region Local Imports
import {
    getTemplate,
    isAlreadyExist,
    writeFile,
    addToIndex
} from '../../operations';
import { moleculer } from '../../../../paths';
import { ICommon } from '../../../../typings';
import { createRepositoryParams } from '../../params/moleculer.params';
import { createInterface, createEntityInstance, createTest } from '.';
// #endregion Local Imports

export const createRepository = (answers: ICommon.IAnswers): void => {
    const templatePath = createRepositoryParams.templatePath;

    const templateProps = {
        upperFileName: answers.upperFileName
    };

    const indexTemplate = createRepositoryParams.indexTemplate;

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplate, templateProps),
        message: 'Repository added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: 'Added new Repository.'
    };

    const repositoryTestParams = {
        answers,
        dirPath: `${moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
        successMessage: 'Added new Repository test.',
        templatePath: createRepositoryParams.testTemplatePath,
        templateProps
    };

    if (!isAlreadyExist(moleculer.interfaceDir, answers.upperFileName)) {
        createInterface(
            answers,
            'Repositories',
            '',
            createRepositoryParams.createInterfaceParams
        );
    }

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createEntityInstance(
        answers,
        createRepositoryParams.createEntityTemplatesParams
    );
    createTest(repositoryTestParams);
};
