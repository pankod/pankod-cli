// #region Global Imports
import * as inquirer from 'inquirer';
// #region Global Imports

// #region Local Imports
import * as factory from './workbenches';
// #endregion Local Imports

const prepareOptions = (answers: ICommon.IAnswers, custom?: object) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, f => f.toUpperCase());
    const unCapitalizedName = answers.fileName.replace(/\b\w/g, f => f.toLowerCase());

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

// TODO: element = chain each & IProjectTypes.element
export const produce = async (project, element): Promise<void> => {
    const questions = getQuestionsByElement(element);

    const answers = await inquirer.prompt<ICommon.IAnswers>(questions);

    const options = prepareOptions(answers);

    factory[project](element, options);
};
