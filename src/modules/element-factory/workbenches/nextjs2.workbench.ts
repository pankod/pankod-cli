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
            // TODO: Refactor as ONE method.
            if (options.implementation === 'functional') {
                createFuncComponent({...options, isPage: true})
            } else {
                createClassComponent({ ...options, isPage: true });
            }
        },

        Component: () => {
            if (options.implementation === 'functional') {
                createFuncComponent(options);
            } else {
                createClassComponent(options);
            }
        }

        // Plugin: () => {
        //     if (options.pluginType) PluginHelper[answers.pluginType]();
        // }
    };

    workbench[element]();
};
