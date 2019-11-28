// #region Local Imports
import { ICommon } from '../../../../typings';
import { getTemplate, writeFile } from '../../operations';
import { createStyledComponentParams, createStyleParams } from '../../params/nextjs2.params';
// #region Local Imports

export const createStyle = (options: ICommon.IAnswers): void => {
    const { fileName, lowerFileName, isPage, isStyled, hasStyle } = options;

    if (!hasStyle) return;

    const styleParams = isStyled
        ? createStyledComponentParams
        : createStyleParams;

    const {
        templatePath,
        pageDirPath,
        compDirPath,
        pageStyledDirPath
    } = styleParams;

    if (isPage) {
        if (isStyled) {
            options.target = `${pageStyledDirPath}/${fileName}.ts`;
        } else {
            options.target = `${pageDirPath}/${lowerFileName}/style.scss`;
        }
    } else {
        options.target = `${compDirPath}/${fileName}/${
            isStyled ? 'styled.ts' : 'style.scss'
        }`;
    }

    const writeFileProps = {
        dirPath: options.target,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new style file'
    };

    writeFile(writeFileProps);
};
