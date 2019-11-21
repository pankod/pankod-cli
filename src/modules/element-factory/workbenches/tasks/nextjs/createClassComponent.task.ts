// #region Local Imports
import { ICommon } from '../../../../typings';
import { nextjs } from '../../../../paths';
import {
    getTemplate,
    createFile,
    writeFile,
    addToIndex
} from '../../operations';
import { createClassComponentParams } from '../../params/nextjs.params';
import { createInterface, addReducer, addAction } from '.';
// #endregion Local Imports

export const createClassComponent = (answers: ICommon.IAnswers): void => {
    const {
        templatePath,
        indexTemplatePath,
        createInterfaceParams,
        addReducerParams,
        addActionParams
    } = createClassComponentParams;

    const { lowerFileName, isConnectStore = false, isPage = false } = answers;

    const pagesDir = `${nextjs.pagesDir}/${lowerFileName}`;

    const classDir = isPage
        ? pagesDir
        : `${nextjs.componentsDir}/${answers.fileName}`;

    const templateProps = {
        fileName: answers.fileName,
        hasStyle: answers.hasStyle,
        interfaceName: `I${answers.fileName}`,
        isConnectStore: answers.isConnectStore,
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${nextjs.componentsDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${classDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: 'Added new class component'
    };

    createFile(classDir);
    writeFile(writeFileProps);
    createInterface(answers, true, createInterfaceParams);

    if (isConnectStore) {
        addReducer(templateProps, addReducerParams);
        addAction(templateProps, addActionParams);
    }

    if (!isPage) {
        addToIndex(addIndexParams);
    }
};
