// #region Local Imports
import * as tasks from './tasks';
// #endregion Local Imports

export const svelte = (element, options: ICommon.IAnswers) => {
    const workbench = {
        Component: async (): Promise<void> => {
            tasks.createComponent(options);
        },

        // Test: async (): Promise<void> => {
        //     tasks.createStyle({
        //         ...options,
        //         dirPath: `${Config.svelte.componentsDir}/${options.fileName}/index.spec.js`,
        //         successMessage: 'Added new component test.',
        //         templatePath: Config.svelte.templates.componentTestTemplate
        //     });
        // }
    };

    workbench[element]();
};
