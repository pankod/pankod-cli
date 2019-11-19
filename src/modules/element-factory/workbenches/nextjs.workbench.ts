// #region Local Imports
// TODO: import helpers and types ...and you know
// #endregion Local Imports

export const nextjs = (element: ICommon.element, options: ICommon.Ioptions) => {
    const workbench: INextjsActions = {
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
            if (options.pluginType) PluginHelper[options.pluginType]();
        }
    };

    workbench[element]();
};
