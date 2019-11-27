// #region Local Imports
import * as questions from './questions/nextjs2';
import { INextjs2Questions } from '../../typings';
// #endregion Local Imports

export const nextjs2: INextjs2Questions = {
    Page: [
        questions.implementation,
        questions.enterPageName,
        questions.customPath,
        questions.enterRouteName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],

    Component: [
        questions.implementation,
        questions.enterComponentName,
        questions.addStyle,
        questions.connectStore,
        questions.isHaveReducer
    ]

    // Plugin: [
    //     questions.addPlugin
    // ]
};
