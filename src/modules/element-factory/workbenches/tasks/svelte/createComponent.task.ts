// #region Local Imports
import { getTemplate, createFile, writeFile } from '../../operations';
import { ICommon } from '../../../../typings';
import { createComponentParams } from '../../params/svelte.params';
import { createTest, createStyle } from '.';
// #endregion Local Imports

export const createComponent = (options: ICommon.IAnswers): void => {
    const { fileName, hasStyle } = options;

    const { componentsDir, templatePath } = createComponentParams;

    const componentDir = `${componentsDir}/${fileName}`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${componentDir}/index.svelte`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Add new component.'
    };

    createTest(options);

    if (hasStyle) {
        createStyle(options);
    }

    createFile(componentDir);
    writeFile(writeFileProps);
};
