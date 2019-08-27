"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const inquirer = require("inquirer");
//#region Global Imports
//#region Local Imports
const config_1 = require("../../config");
const Common_1 = require("../Common");
const helper_1 = require("./helper");
//#endregion Local Imports
const questions = {
    Component: [
        {
            message: 'Enter component name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.svelte.componentsDir, false, 'component');
            }
        },
        {
            default: true,
            message: 'Do you want to add style file?',
            name: 'hasStyle',
            type: 'confirm'
        },
    ]
};
const createComponentParams = {
    templatePath: config_1.Config.svelte.templates.componentTemplate,
    componentsDir: config_1.Config.svelte.componentsDir
};
const createStyleParams = {
    compDirPath: config_1.Config.svelte.componentsDir,
    templatePath: config_1.Config.svelte.templates.stylePageTemplate
};
const actions = {
    Component: async (answers) => {
        const { hasStyle = false, lowerFileName, fileName } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        const templateProps = {
            fileName,
            hasStyle,
            lowerFileName
        };
        const createTestParams = {
            answers,
            dirPath: `${config_1.Config.svelte.componentsDir}/${answers.fileName}/index.spec.js`,
            successMessage: 'Added new component test.',
            templatePath: config_1.Config.svelte.templates.componentTestTemplate,
            templateProps
        };
        helper_1.Helper.createComponent(answers, createComponentParams);
        helper_1.Helper.createTest(createTestParams);
        if (hasStyle) {
            helper_1.Helper.createStyle(answers, createStyleParams);
        }
    }
};
exports.default = {
    showQuestions: async (type) => {
        const componentType = type.replace(' ', '');
        const answers = await inquirer.prompt(questions[componentType]);
        actions[componentType](answers);
    }
};
