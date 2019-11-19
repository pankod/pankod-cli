// #region Local Imports
import * as questions from './Questions/';
import { IMoleculerQuestions } from './IMoleculerTypes';
// #endregion Local Imports

const questionsMap: IMoleculerQuestions = {
    entity: [
        questions.entityName
    ],

    service: [
        questions.serviceName,
        questions.isPrivate,
        questions.hasDatabase
    ]
};

export const getQuestionsByElementType = (type: string) => questionsMap[type];
