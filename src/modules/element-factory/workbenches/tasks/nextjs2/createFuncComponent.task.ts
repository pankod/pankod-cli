// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createFuncComponentParams } from '../nextjs2.config';
import * as Helpers from '.';
// #region Local Imports

export const createFuncComponent = (options: ICommon.IAnswers): void => {
    const {
        componentsDir,
        templatePath,
        indexTemplatePath,
        componentTestTemplatePath
    } = createFuncComponentParams;

    const { fileName, hasStyle } = options;

    options.isScss = hasStyle === 'scss';
    options.isStyled = hasStyle === 'styled';

    const funcComponentDir = `${componentsDir}/${fileName}`;

    // TODO: # Modularize Preparation of CommonHelper Props
    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(indexTemplatePath, options),
        message: 'Component added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${funcComponentDir}/index.tsx`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, options),
        message: 'Added new functional component.'
    };

    const writeTestFileProps: ICommon.IWriteFile = {
        dirPath: `${funcComponentDir}/index.spec.tsx`,
        getFileContent: () => CommonHelper.getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };
    // TODO: / Modularize Preparation of CommonHelper Props

    CommonHelper.createFile(funcComponentDir);
    CommonHelper.writeFile(writeFileProps);
    CommonHelper.writeFile(writeTestFileProps);
    CommonHelper.addToIndex(addIndexParams);
    Helpers.createInterface(options);
    Helpers.createStyle(options);
};
