// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
// TODO: Reshape directory or use @Module
import { ICommon } from '../../../../typings';
// #endregion Local Imports

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
    when: ({ isConnectStore = false }): boolean => isConnectStore
};
