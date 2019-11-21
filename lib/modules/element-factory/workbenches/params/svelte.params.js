"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths = require("../../../paths");
// #endregion Local Imports
exports.createComponentParams = {
    templatePath: paths.svelte.templates.componentTemplate,
    componentsDir: paths.svelte.componentsDir
};
exports.createStyleParams = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.stylePageTemplate
};
