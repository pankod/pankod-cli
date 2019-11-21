// #region Local Imports
import * as questions from './questions/moleculer';
import { IMoleculerQuestions } from '../../typings';
// #endregion Local Imports

export const moleculer: IMoleculerQuestions = {
    entity: [
        questions.entityName
    ],

    service: [
        questions.serviceName,
        questions.isPrivate,
        questions.hasDatabase
    ]
};
