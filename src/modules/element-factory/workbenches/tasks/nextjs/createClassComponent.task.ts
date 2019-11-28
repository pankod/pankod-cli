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

export const createClassComponent = (options: ICommon.IAnswers): void => {
    const {
        templatePath,
        indexTemplatePath,
        createInterfaceParams,
        addReducerParams,
        addActionParams
    } = createClassComponentParams;

    const { lowerFileName, isConnectStore = false, isPage = false } = options;

    const pagesDir = `${nextjs.pagesDir}/${lowerFileName}`;

    const classDir = isPage
        ? pagesDir
        : `${nextjs.componentsDir}/${options.fileName}`;

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${nextjs.componentsDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplatePath, options),
        message: 'Component added to index.ts'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${classDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new class component'
    };

    createFile(classDir);
    writeFile(writeFileProps);
    createInterface(options, true, createInterfaceParams);

    if (isConnectStore) {
        addReducer(options, addReducerParams);
        addAction(options, addActionParams);
    }

    if (!isPage) {
        addToIndex(addIndexParams);
    }
};
