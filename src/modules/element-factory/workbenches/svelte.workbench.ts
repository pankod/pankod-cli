// #region Local Imports
import { createComponent } from './tasks/svelte';
import { ICommon, ISvelteActions } from '../../typings';
// #endregion Local Imports

export const svelte = (
    // TODO: infer to SvelteElement to supress can't assign to 'never'
    // * passing as Element temporarily
    // element: SvelteElement,
    element: ICommon.Element,
    options: ICommon.IAnswers
) => {
    const workbench: ISvelteActions = {
        Component: () => {
            createComponent(options);
        }
    };

    workbench[element]();
};
