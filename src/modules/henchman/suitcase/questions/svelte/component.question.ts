// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
import { ICommon } from '../../ICommon';
// #endregion Local Imports

export const componentName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.svelte.componentsDir, false, 'component');
    }
};

export const hasStyle: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    default: true,
    message: 'Do you want to add style file?',
    name: 'hasStyle',
    type: 'confirm'
};
