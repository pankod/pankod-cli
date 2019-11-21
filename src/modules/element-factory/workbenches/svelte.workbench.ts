// #region Local Imports
import { createComponent, createStyle } from './tasks';
import * as paths from '../../paths';
import { ICommon, SvelteElement, ISvelteActions } from '../../typings';
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
        },

        Test: () => {
            createStyle({
                ...options,
                dirPath: `${paths.svelte.componentsDir}/${options.fileName}/index.spec.js`,
                successMessage: 'Added new component test.',
                templatePath: paths.svelte.templates.componentTestTemplate
            });
        }
    };

    workbench[element]();
};
