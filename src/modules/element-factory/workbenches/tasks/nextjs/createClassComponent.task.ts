// #region Local Imports
import { ICommon } from '../../ICommon';
import * as paths from '../../../../paths';
import { CommonHelper } from '../../Common';
import { createClassComponentParams } from '../nextjs.config';
import * as Helpers from './';
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
    const pagesDir = `${paths.nextjs.pagesDir}/${lowerFileName}`;
    const classDir = isPage ? pagesDir : `${paths.nextjs.componentsDir}/${answers.fileName}`;
    const templateProps = {
        fileName: answers.fileName,
        hasStyle: answers.hasStyle,
        interfaceName: `I${answers.fileName}`,
        isConnectStore: answers.isConnectStore,
        lowerFileName: answers.lowerFileName,
        upperFileName: answers.upperFileName
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${paths.nextjs.componentsDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${classDir}/index.tsx`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: 'Added new class component'
    };

    CommonHelper.createFile(classDir);
    CommonHelper.writeFile(writeFileProps);
    Helpers.createInterface(answers, true, createInterfaceParams);

    if (isConnectStore) {
        Helpers.addReducer(templateProps, addReducerParams);
        Helpers.addAction(templateProps, addActionParams);
    }

    if (!isPage) {
        CommonHelper.addToIndex(addIndexParams);
    }
};
