// #region Local Imports
import * as paths from '../../../paths';
import { ISvelteHelper } from '../../../typings';
// #endregion Local Imports

export const createComponentParams: ISvelteHelper.ICreateComponentParams = {
    templatePath: paths.svelte.templates.componentTemplate,
    componentsDir: paths.svelte.componentsDir
};

export const createStyleParams: ISvelteHelper.ICreateStyle = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.stylePageTemplate
};
