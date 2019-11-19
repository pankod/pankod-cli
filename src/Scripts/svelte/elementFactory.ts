// #region Local Imports
import { ICommon } from '../ICommon';
import * as Helpers from './Helpers';
import { elementType } from './ISvelteTypes';
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

export const createElement = (elementType: elementType, answers: ICommon.IAnswers) => {
    const options = prepareOptions(answers);

    const factory = {
        Component: async (): Promise<void> => {
            Helpers.createComponent(options);
        },

        // Test: async (): Promise<void> => {
        //     Helpers.createStyle({
        //         ...options,
        //         dirPath: `${Config.svelte.componentsDir}/${options.fileName}/index.spec.js`,
        //         successMessage: 'Added new component test.',
        //         templatePath: Config.svelte.templates.componentTestTemplate
        //     });
        // }
    };

    factory[elementType]();
};
