"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const questions_1 = require("../../questions");
const inquirer = require("inquirer");
const Common_1 = require("../../Scripts/Common");
class Add extends command_1.Command {
    async run() {
        const { args: { entityType } } = this.parse(Add);
        const { projectType } = Common_1.CommonHelper.getPankodConfig();
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
        options: ['Page', 'FunctionalComponent', 'ClassComponent', 'Plugin']
    }
];
Add.usage = ['add Page', 'add FunctionalComponent', 'add ClassComponent', 'add Plugin'];
exports.default = Add;
