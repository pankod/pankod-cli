"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const svelte_1 = require("./tasks/svelte");
const paths = require("../../paths");
// #endregion Local Imports
exports.svelte = (
// TODO: infer to SvelteElement to supress can't assign to 'never'
// * passing as Element temporarily
// element: SvelteElement,
element, options) => {
    const workbench = {
        Component: () => {
            svelte_1.createComponent(options);
        },
        Test: () => {
            svelte_1.createStyle(Object.assign(Object.assign({}, options), { dirPath: `${paths.svelte.componentsDir}/${options.fileName}/index.spec.js`, successMessage: 'Added new component test.', templatePath: paths.svelte.templates.componentTestTemplate }));
        }
    };
    workbench[element]();
};
