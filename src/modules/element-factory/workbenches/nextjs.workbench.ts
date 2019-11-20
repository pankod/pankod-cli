// #region Local Imports
import * as tasks from './tasks';
import { ICommon, NextElement, INextjsActions } from '../../typings';
// #endregion Local Imports

export const nextjs = (element: NextElement, options: ICommon.IAnswers) => {
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

        // Plugin: () => {
        //     if (options.pluginType) PluginHelper[options.pluginType]();
        // }
    };

    workbench[element]();
};
