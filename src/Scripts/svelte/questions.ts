// #region Local Imports
import * as questions from './Questions/'
// #endregion Local Imports

export const getQuestionsByElementType = (type: string) => questionsMap[type];

const questionsMap = {
    Component: [
        questions.componentName,
        questions.hasStyle
    ]
};
