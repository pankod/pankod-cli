// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createFuncComponentParams } from '../nextjs.config';
import * as Helpers from '.';
// #endregion Local Imports

export const createFuncComponent = (answers: ICommon.IAnswers): void => {
    const { lowerFileName, fileName, hasStyle } = answers;

    const {
        componentsDir,
        indexTemplatePath,
        templatePath,
        createInterfaceParams
    } = createFuncComponentParams;

    const funcDir = `${componentsDir}/${answers.fileName}`;

    const templateProps = {
        fileName,
        hasStyle,
        interfaceName: `I${fileName}`,
        lowerFileName
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${funcDir}/index.tsx`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: 'Add new functional component.'
    };

    CommonHelper.createFile(funcDir);
    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
    Helpers.createInterface(answers, false, createInterfaceParams);
};
