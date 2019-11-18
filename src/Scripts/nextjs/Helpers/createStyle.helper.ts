// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
// #endregion Local Imports

export const createStyle = (
    answers: ICommon.IAnswers,
    createStyleParams: INextjsHelper.ICreateStyle
): void => {
    const { fileName, isPage = false, lowerFileName } = answers;

    const templateProps = { fileName, lowerFileName };
    const pageDirPath = `${createStyleParams.pageDirPath}/${answers.fileName.replace(/\b\w/g, foo =>
        foo.toLowerCase()
    )}/style.scss`;
    const compDirPath = `${createStyleParams.compDirPath}/${answers.fileName}/style.scss`;

    const writeFileProps = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () =>
            CommonHelper.getTemplate(createStyleParams.templatePath, templateProps),
        message: 'Added new style file'
    };

    CommonHelper.writeFile(writeFileProps);
};
