// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createStyledComponentParams, createStyleParams } from '../nextjs2.config';
// #region Local Imports

export const createStyle = (options: ICommon.IAnswers): void => {
    const { fileName, lowerFileName, isPage, isStyled } = options;

    const styleParams = isStyled ? createStyledComponentParams : createStyleParams;

    const { templatePath, pageDirPath, compDirPath, pageStyledDirPath } = styleParams;

    if (isPage) {
        if (isStyled) {
            options.target = `${pageStyledDirPath}/${fileName}.ts`;
        } else {
            options.target = `${pageDirPath}/${lowerFileName}/style.scss`;
        }
    } else {
        options.target = `${compDirPath}/${fileName}/${isStyled ? 'styled.ts' : 'style.scss'}`;
    }

    const writeFileProps = {
        dirPath: options.target,
        getFileContent: () => CommonHelper.getTemplate(templatePath, options),
        message: 'Added new style file'
    };

    CommonHelper.writeFile(writeFileProps);
};
