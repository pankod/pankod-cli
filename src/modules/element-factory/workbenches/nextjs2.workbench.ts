// #region Local Imports
import * as tasks from './tasks';
import { ICommon, Next2Element, INextjs2Actions } from '../../typings';
// #endregion Local Imports

export const nextjs2 = (element: Next2Element, options: ICommon.IAnswers): void => {
    const workbench: INextjs2Actions = {
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
        //     if (options.pluginType) PluginHelper[answers.pluginType]();
        // }
    };

    workbench[element]();
};
