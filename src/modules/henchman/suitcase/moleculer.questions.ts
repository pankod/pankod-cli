import * as questions from './questions';

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
