// #region Local Imports
// TODO: import helpers and types ...and you know
// #endregion Local Imports

// TODO import * as questions from './questions';

export const getQuestionsByElementType = (type: string) => questionsMap[type];

export const getQuestionByProject = (project: string): Questions<ICommon.IAnswers> => ({
    choices: choices[project],
    message: 'What would you like to add?',
    name: 'element',
    type: 'list'
});
