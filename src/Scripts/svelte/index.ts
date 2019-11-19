// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import { ICommon } from '../ICommon';
import { getQuestionsByElementType } from './questions';
import { createElement } from './elementFactory';
import { elementType } from './ISvelteTypes';
// #endregion Local Imports

export default {
    showQuestions: async (elementType: elementType): Promise<void> => {
        const questions = getQuestionsByElementType(elementType);
        
        const answers = await inquirer.prompt<ICommon.IAnswers>(questions);

        createElement(elementType, answers);
    }
};
