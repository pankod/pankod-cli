// #region Local Imports
import { ICommon } from '../ICommon';
import { Config } from '../../config';
import * as Helpers from './Helpers';
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

export const createElement = (elementType: string, answers: any) => {
    const options = prepareOptions(answers);

    const factory = {
        Component: async (answers: ICommon.IAnswers): Promise<void> => {
            Helpers.createComponent({
                ...options,
                dirPath: `${Config.svelte.componentsDir}/${answers.fileName}/index.spec.js`,
                successMessage: 'Added new component test.',
                templatePath: Config.svelte.templates.componentTestTemplate
            });
        }
    };

    factory[elementType](answers);
};
