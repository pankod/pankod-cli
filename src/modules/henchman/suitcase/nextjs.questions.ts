// #region Local Imports
import * as questions from './questions/nextjs';
import { INextjsQuestions } from '../../typings';
// #endregion Local Imports

export const nextjs: INextjsQuestions = {
    ClassComponent: [
        questions.enterComponentName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],

    FunctionalComponent: [
        questions.enterComponentName,
        questions.addStyle
    ],

    Page: [
        questions.enterPageName,
        questions.customPath,
        questions.routeName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],
    Plugin: [
        questions.plugin
    ]
};
