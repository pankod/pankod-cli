// #region Local Imports
import { CommonHelper } from '../../Common';
import * as paths from '../../../../paths';
import { ICommon } from '../../ICommon';
import * as Helpers from '.';
import { createRepositoryParams } from '../moleculer.config';
// #endregion Local Imports

export const createRepository = (answers: ICommon.IAnswers): void => {
    const templatePath = createRepositoryParams.templatePath;

    const templateProps = {
        upperFileName: answers.upperFileName
    };

    const indexTemplate = createRepositoryParams.indexTemplate;

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${paths.moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
        message: 'Repository added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${paths.moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: 'Added new Repository.'
    };

    const repositoryTestParams = {
        answers,
        dirPath: `${paths.moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
        successMessage: 'Added new Repository test.',
        templatePath: createRepositoryParams.testTemplatePath,
        templateProps
    };

    if (!CommonHelper.isAlreadyExist(paths.moleculer.interfaceDir, answers.upperFileName)) {
        Helpers.createInterface(
            answers,
            'Repositories',
            '',
            createRepositoryParams.createInterfaceParams
        );
    }

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
    Helpers.createEntityInstance(answers, createRepositoryParams.createEntityTemplatesParams);
    Helpers.createTest(repositoryTestParams);
};
