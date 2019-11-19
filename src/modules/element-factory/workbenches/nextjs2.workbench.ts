// #region Local Imports
// TODO: import helpers and types ...and you know
// #endregion Local Imports

export const nextjs2 = (element: string, options: object): void => {
    const workbench = {
        Page: () => {
            Helpers.createClassComponent({ ...options, isPage: true });
        },

        ClassComponent: () => {
            Helpers.createClassComponent(options);
        },

        FunctionalComponent: () => {
            Helpers.createFuncComponent({ ...options, isFuncComponent: true });
        },

        Plugin: () => {
            if (options.pluginType) PluginHelper[answers.pluginType]();
        }
    };

    workbench[element]();
};
