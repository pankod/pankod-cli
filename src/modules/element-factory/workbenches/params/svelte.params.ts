// #region Local Imports
import { ISvelteHelper } from '../../../typings';
import * as paths from '../../../paths';
// #endregion Local Imports

export const createComponentParams: ISvelteHelper.ICreateComponentParams = {
    templatePath: paths.svelte.templates.componentTemplate,
    componentsDir: paths.svelte.componentsDir
};

export const createStyleParams: ISvelteHelper.ICreateStyle = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.stylePageTemplate
};
