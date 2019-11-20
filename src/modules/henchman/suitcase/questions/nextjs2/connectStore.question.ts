// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { ICommon } from '../../../../typings';
// #endregion Local Imports

export const connectStore: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    message: 'Do you want to connect store ?',
    name: 'isConnectStore',
    type: 'confirm',
    default: false
};
