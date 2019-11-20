// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import * as paths from '../../../../paths';
import { ICommon } from '../../../../typings';
import { validate } from '../../../../element-factory/workbenches/operations';
// #endregion Local Imports

export const enterComponentName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return validate(val, paths.nextjs2.componentsDir, false, 'component');
    }
};
