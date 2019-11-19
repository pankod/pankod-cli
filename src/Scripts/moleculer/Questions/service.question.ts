// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
// #endregion Local Imports

export const serviceName = {
    message: 'Enter service name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.moleculer.servicesDir, true, 'service');
    }
};

export const isPrivate = {
    default: true,
    message: 'Is service open to outside?',
    name: 'isPrivate',
    type: 'confirm'
};

export const hasDatabase = {
    default: true,
    message: 'Are you going to have a database connection?',
    name: 'hasDatabase',
    type: 'confirm'
};
