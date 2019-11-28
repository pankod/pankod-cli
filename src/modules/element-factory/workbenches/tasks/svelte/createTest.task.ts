// #region Local Imports
import { ICommon } from '../../../../typings';
import { getTemplate, writeFile } from '../../operations';
import { createTestParams } from '../../params/svelte.params';
// #endregion Local Imports

export const createTest = (options: any): void => {
    const { templatePath } = createTestParams;

    const { dirPath, successMessage } = options;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath,
        getFileContent: () => getTemplate(templatePath, options),
        message: successMessage
    };

    writeFile(writeFileProps);
};
