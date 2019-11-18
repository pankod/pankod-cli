// #region Local Imports
import { ISvelteHelper } from './ISvelteTypes';
import { Config } from '../../config';
// #endregion Local Imports

export const createComponentParams: ISvelteHelper.ICreateComponentParams = {
    templatePath: Config.svelte.templates.componentTemplate,
    componentsDir: Config.svelte.componentsDir
};

export const createStyleParams: ISvelteHelper.ICreateStyle = {
    compDirPath: Config.svelte.componentsDir,
    templatePath: Config.svelte.templates.stylePageTemplate
};
