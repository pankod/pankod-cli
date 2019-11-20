// #region Local Imports
import * as tasks from './tasks';
import * as paths from '../../paths';
import { ICommon, SvelteElement } from '../../typings';
// #endregion Local Imports

export const svelte = (element: SvelteElement, options: ICommon.IAnswers) => {
    const workbench = {
        Component: async (): Promise<void> => {
            tasks.createComponent(options);
        },

        Test: async (): Promise<void> => {
            tasks.createStyle({
                ...options,
                dirPath: `${paths.svelte.componentsDir}/${options.fileName}/index.spec.js`,
                successMessage: 'Added new component test.',
                templatePath: paths.svelte.templates.componentTestTemplate
            });
        }
    };

    workbench[element]();
};
