// #region Local Imports
// TODO: import helpers and types ...and you know
// #endregion Local Imports

export const svelte = (element, options: ICommon.IAnswers) => {
    const workbench = {
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

    workbench[element]();
};
