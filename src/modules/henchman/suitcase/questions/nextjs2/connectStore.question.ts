import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';

export const connectStore: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    message: 'Do you want to connect store ?',
    name: 'isConnectStore',
    type: 'confirm',
    default: false
};
