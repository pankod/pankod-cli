// #region Local Imports
import { createClassComponent, createFuncComponent } from './tasks/nextjs';
import { ICommon, NextElement, INextjsActions } from '../../typings';
// #endregion Local Imports

export const nextjs = (
    // TODO: infer to NextElement to supress can't assign to 'never'
    // * passing as Element temporarily
    // element: NextElement,
    element: ICommon.Element,
    options: ICommon.IAnswers
) => {
    const workbench: INextjsActions = {
        Page: () => {
            createClassComponent({ ...options, isPage: true });
        },

        ClassComponent: () => {
            createClassComponent(options);
        },

        FunctionalComponent: () => {
            createFuncComponent({ ...options, isFuncComponent: true });
        }

        // Plugin: () => {
        //     if (options.pluginType) PluginHelper[options.pluginType]();
        // }
    };

    workbench[element]();
};
