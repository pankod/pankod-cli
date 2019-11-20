// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { Config } from '../../../../config';
import { ICommon } from '../../../../typings';
import { validate } from '../../../../element-factory/workbenches/operations';
// #endregion Local Imports

export const addStyle: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    default: true,
    message: 'Do you want to add style file?',
    name: 'hasStyle',
    type: 'confirm'
};

export const connectStore: inquirer.ConfirmQuestion<ICommon.IAnswers> = {
    default: false,
    message: 'Do you want to connect store ?',
    name: 'isConnectStore',
    type: 'confirm'
};

export const enterComponentName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return validate(val, Config.nextjs.componentsDir, false, 'component');
    }
};

export const isHaveReducer: inquirer.ListQuestion<ICommon.IAnswers> = {
    choices: [
        new inquirer.Separator(),
        {
            name: 'Yes, I want to have new reducer.',
            value: true
        },
        {
            name: 'No, do not create a new reducer.',
            value: false
        }
    ],
    message: 'Do you want to create a new reducer or use your own?',
    name: 'isHaveReducer',
    type: 'list',
    when: ({ isConnectStore = false }: { isConnectStore?: boolean }): boolean => isConnectStore
};
