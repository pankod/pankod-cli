// #region Local Imports
// TODO: import helpers and types ...and you know
import * as suitcase from './suitcase';
// #endregion Local Imports

export const getQuestionsByElementType = (element: string) => {
    return Object.values(suitcase).find(q => q[element]);
};

export const getQuestionByProject = (
    project: string
): Questions<ICommon.IAnswers> => ({

    // TODO: use helper to get choices
    choices: Object.keys(suitcase[project]),
    message: 'What would you like to add?',
    name: 'element',
    type: 'list'
});
