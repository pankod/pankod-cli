// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import * as suitcase from './suitcase';
import { ICommon } from '../typings';
// #endregion Local Imports

export const getAllQuestionsAsObject = () => {
    return Object.assign({}, ...Object.values(suitcase));
};

export const getAllElements = () => {
    return Object.keys(getAllQuestionsAsObject());
};

export const getUsage = () => getAllElements().map(e => `add ${e}`);

export const getQuestionsOfProjectElement = (
    project: ICommon.Project,
    element: ICommon.Element
) => {
    return suitcase[project][element];
};

export const getQuestionByProject = (
    project: ICommon.Project
): inquirer.Questions<ICommon.IAnswers> => ({
    choices: Object.keys(suitcase[project]),
    message: 'What would you like to add?',
    name: 'selection',
    type: 'list'
});
