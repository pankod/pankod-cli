// #region Local Imports
import { getTemplate, writeFile } from '../../operations';
import { createStyleParams } from '../../params';
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const createStyle = (options: ICommon.IAnswers): void => {
    const { fileName } = options;

    const compDirPath = `${createStyleParams.compDirPath}/${fileName}/style.scss`;

    const writeFileProps = {
        dirPath: compDirPath,
        getFileContent: () =>
            getTemplate(createStyleParams.templatePath, options),
        message: 'Added new style file'
    };

    writeFile(writeFileProps);
};
