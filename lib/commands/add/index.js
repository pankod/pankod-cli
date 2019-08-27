"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const questions_1 = require("../../questions");
const inquirer = require("inquirer");
const Common_1 = require("../../Scripts/Common");
const supportedProjects = ['nextjs', 'moleculer', 'svelte'];
const supportedCommands = {
    moleculer: ['Entity', 'Service'],
    nextjs: ['Page', 'FunctionalComponent', 'ClassComponent', 'Plugin'],
    svelte: ['Component']
};
class Add extends command_1.Command {
    constructor() {
        super(...arguments);
        this.validateProjectSupported = (projectType) => {
            if (!supportedProjects.includes(projectType)) {
                this.error(`The project ${projectType} isn't supported.`);
            }
        };
        this.validateCommand = (entityType, projectType) => {
            if (entityType && !supportedCommands[projectType].includes(entityType)) {
                this.error(`Command "${entityType}" isn't supported by ${projectType} project.`);
            }
        };
    }
    async run() {
        const { args: { entityType } } = this.parse(Add);
        const { projectType } = Common_1.CommonHelper.getPankodConfig();
        this.validateProjectSupported(projectType);
        this.validateCommand(entityType, projectType);
        let answers = { fileName: '', fileType: '' };
        if (!entityType) {
            answers = await inquirer.prompt(questions_1.default[projectType]);
        }
        const questionsHelper = require(`../../Scripts/${projectType}/index`);
        try {
            await questionsHelper.default.showQuestions(answers.fileType || entityType);
        }
        catch (error) {
            this.error(error);
        }
    }
}
Add.description = 'Add services, components and more...';
Add.args = [
    {
        name: 'entityType',
        options: ['Entity', 'Service', 'Page', 'FunctionalComponent', 'ClassComponent', 'Plugin', 'Component']
    }
];
Add.usage = ['add Entity', 'add Service', 'add Page', 'add FunctionalComponent', 'add ClassComponent', 'add Plugin'];
exports.default = Add;
