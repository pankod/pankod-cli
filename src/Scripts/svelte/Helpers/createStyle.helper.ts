// #region Local Imports
import { CommonHelper } from '../../Common';
import { createStyleParams } from '../svelte.config';
// #endregion Local Imports

export const createStyle = (options: any): void => {
    const { fileName } = options;

    const compDirPath = `${createStyleParams.compDirPath}/${fileName}/style.scss`;

    const writeFileProps = {
        dirPath: compDirPath,
        getFileContent: () => CommonHelper.getTemplate(createStyleParams.templatePath, options),
        message: 'Added new style file'
    };

    CommonHelper.writeFile(writeFileProps);
};
