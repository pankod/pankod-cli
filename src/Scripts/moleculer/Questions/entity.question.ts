// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
import { ICommon } from '../../ICommon';
// #endregion Local Imports

export const entityName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter entity name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.moleculer.repositoriesDir, true, 'entity');
    }
};
