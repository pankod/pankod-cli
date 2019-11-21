// #region Local Imports
import { createClassComponent, createFuncComponent } from './tasks/nextjs2';
import { ICommon, Next2Element, INextjs2Actions } from '../../typings';
// #endregion Local Imports

export const nextjs2 = (
    // TODO: infer to Next2Element to supress can't assign to 'never'
    // * passing as Element temporarily
    // element: Next2Element,
    element: ICommon.Element,
    options: ICommon.IAnswers
): void => {
    const workbench: INextjs2Actions = {
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
        //     if (options.pluginType) PluginHelper[answers.pluginType]();
        // }
    };

    workbench[element]();
};
