// #region Local Imports
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
import { createComponentParams } from '../svelte.config';
import * as Helpers from '../Helpers';
// #endregion Local Imports

export const createComponent = (options: any): void => {
    const { fileName, hasStyle } = options;

    const { componentsDir, templatePath } = createComponentParams;

    const componentDir = `${componentsDir}/${fileName}`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${componentDir}/index.svelte`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, options),
        message: 'Add new component.'
    };

    Helpers.createTest(options);

    if (hasStyle) {
        Helpers.createStyle(options);
    }

    CommonHelper.createFile(componentDir);
    CommonHelper.writeFile(writeFileProps);
};
