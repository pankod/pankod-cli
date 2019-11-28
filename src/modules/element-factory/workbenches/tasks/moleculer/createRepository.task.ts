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

export const createRepository = (options: ICommon.IAnswers): void => {
    const templatePath = createRepositoryParams.templatePath;

    const indexTemplate = createRepositoryParams.indexTemplate;

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplate, options),
        message: 'Repository added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${moleculer.repositoriesDir}/${options.upperFileName}.ts`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new Repository.'
    };

    const repositoryTestParams = {
        ...options,
        dirPath: `${moleculer.repositoriesTestDir}/${options.upperFileName}.spec.ts`,
        successMessage: 'Added new Repository test.',
        templatePath: createRepositoryParams.testTemplatePath,
    };

    if (!isAlreadyExist(moleculer.interfaceDir, options.upperFileName)) {
        createInterface(
            options,
            'Repositories',
            ''
        );
    }

    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createEntityInstance(
        options,
        createRepositoryParams.createEntityTemplatesParams
    );
    createTest(repositoryTestParams);
};
