// #region Local Imports
import * as questions from './questions/moleculer';
import { IMoleculerQuestions } from '../../typings';
// #endregion Local Imports

export const moleculer: IMoleculerQuestions = {
    Repository: [
        questions.entityName
    ],

    Service: [
        questions.serviceName,
        questions.isPrivate,
        questions.hasDatabase
    ]
};
