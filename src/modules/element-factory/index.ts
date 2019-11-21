// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import * as factory from './workbenches';
import { ICommon } from '../typings';
import { getQuestionsOfProjectElement } from '../henchman';
// #endregion Local Imports

const prepareOptions = (answers: ICommon.IAnswers, custom?: object) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, f =>
        f.toUpperCase()
    );
    const unCapitalizedName = answers.fileName.replace(/\b\w/g, f =>
        f.toLowerCase()
    );

    return {
        ...answers,
        fileName: capitalizedName,
        // TODO: Rename 'upperFileName' as 'capitalizedFileName'
        upperFileName: capitalizedName,
        lowerFileName: unCapitalizedName,
        interfaceName: `I${capitalizedName}`,
        ...custom
    };
};

export const produce = async (
    project: ICommon.Project,
    element: ICommon.Element
): Promise<void> => {
    const questions = getQuestionsOfProjectElement(project, element);

    const answers = await inquirer.prompt<ICommon.IAnswers>(questions);

    const options = prepareOptions(answers);

    factory[project](element, options);
};
