// #region Local Imports
import * as paths from '../../../paths';
import { ISvelteHelper } from '../../../typings';
// #endregion Local Imports

export const createComponentParams: ISvelteHelper.ICreateComponentParams = {
    componentsDir: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.componentTemplate
};

export const createStyleParams: ISvelteHelper.ICreateStyle = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.stylePageTemplate
};

export const createTestParams: ISvelteHelper.ICreateStyle = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.componentTestTemplate
};
