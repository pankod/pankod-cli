// #region Local Imports
import * as tasks from './tasks';
// #endregion Local Imports

export const nextjs = (element: ICommon.element, options: ICommon.Ioptions) => {
    const workbench: INextjsActions = {
        Page: () => {
            tasks.createClassComponent({ ...options, isPage: true });
        },

        ClassComponent: () => {
            tasks.createClassComponent(options);
        },

        FunctionalComponent: () => {
            tasks.createFuncComponent({ ...options, isFuncComponent: true });
        },

        Plugin: () => {
            // TODO: Refactor
            if (options.pluginType) PluginHelper[options.pluginType]();
        }
    };

    workbench[element]();
};
