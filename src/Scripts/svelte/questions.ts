// #region Local Imports
import * as questions from './Questions/';
import { ISvelteQuestions } from './ISvelteTypes';
// #endregion Local Imports

const questionsMap: ISvelteQuestions = {
    Component: [
        questions.componentName,
        questions.hasStyle
    ]
};

export const getQuestionsByElementType = (type: string) => questionsMap[type];
