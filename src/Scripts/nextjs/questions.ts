import { INextjsQuestions } from './INextjsTypes';
import * as questions from './Questions/';

export const getQuestionsByElementType = (type: string) => questionsMap[type];

const questionsMap: INextjsQuestions = {
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
