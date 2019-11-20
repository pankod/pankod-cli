// TODO: import interface
import * as questions from './questions';

export const nextjs2: INextjs2Questions = {
    ClassComponent: [
        questions.enterComponentName,
        questions.addStyle,
        questions.connectStore,
        questions.isHaveReducer
    ],

    FunctionalComponent: [
        questions.enterComponentName,
        questions.addStyle
    ],

    Page: [
        questions.enterPageName,
        questions.customPath,
        questions.enterRouteName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],

    Plugin: [
        questions.addPlugin
    ]
};
