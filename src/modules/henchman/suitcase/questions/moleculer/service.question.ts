// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { Config } from '../../../../config';
import { ICommon } from '../../../../typings';
import { validate } from '../../../../element-factory/workbenches/operations';
// #endregion Local Imports

export const serviceName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter service name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return validate(val, Config.moleculer.servicesDir, true, 'service');
    }
};

export const isPrivate: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    default: true,
    message: 'Is service open to outside?',
    name: 'isPrivate',
    type: 'confirm'
};

export const hasDatabase: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    default: true,
    message: 'Are you going to have a database connection?',
    name: 'hasDatabase',
    type: 'confirm'
};
