// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
// #endregion Local Imports

export const entityName = {
    message: 'Enter entity name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.moleculer.repositoriesDir, true, 'entity');
    }
};
