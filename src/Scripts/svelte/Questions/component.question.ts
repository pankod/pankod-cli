// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
// #endregion Local Imports

export const componentName = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.svelte.componentsDir, false, 'component');
    }
};

export const hasStyle = {
    default: true,
    message: 'Do you want to add style file?',
    name: 'hasStyle',
    type: 'confirm'
};
