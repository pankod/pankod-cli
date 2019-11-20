import * as questions from './questions';

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
