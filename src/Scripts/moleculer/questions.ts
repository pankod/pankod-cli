// #region Local Imports
import * as questions from './Questions/';
// #endregion Local Imports

export const getQuestionsByElementType = (type: string) => questionsMap[type];

const questionsMap = {
    entity: [
        questions.entityName
    ],

    service: [
        questions.serviceName,
        questions.isPrivate,
        questions.hasDatabase
    ]
};
