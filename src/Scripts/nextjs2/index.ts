// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import { ICommon } from '../ICommon';
import { createElement } from './elementFactory';
import { getQuestionsByElementType } from './questions';
// #endregion Local Imports

export default {
    showQuestions: async (elementType: ICommon.ElementType): Promise<void> => {
        const questions = getQuestionsByElementType(elementType);

        const answers = await inquirer.prompt<ICommon.IAnswers>(questions);

        createElement(elementType, answers);
    }
};
