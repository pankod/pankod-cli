// #region Global Imports
import * as inquirer from 'inquirer';
// #endregion Global Imports

// #region Local Imports
import * as suitcase from './suitcase';
import { ICommon } from '../typings';
// #endregion Local Imports

export const getQuestionsByElement = (element: ICommon.Element) => {
    return Object.values(suitcase).find(q => q[element]);
};

export const getQuestionByProject = (
    project: ICommon.Project
): inquirer.Questions<ICommon.IAnswers> => ({
    choices: Object.keys(suitcase[project]),
    message: 'What would you like to add?',
    name: 'element',
    type: 'list'
});
