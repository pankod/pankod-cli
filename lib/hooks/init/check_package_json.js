"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const figlet = require("figlet");
const Common_1 = require("../../Scripts/Common");
const text = {
    moleculer: 'Pankod Moleculer CLI',
    nextjs: 'Pankod NextJS CLI',
    svelte: 'Pankod Svelte CLI',
    pankodCli: 'Pankod CLI'
};
const hook = async function () {
    const pankodConfig = Common_1.CommonHelper.getPankodConfig();
    if (!pankodConfig) {
        this.error('Please specify pankod.projectType in package.json');
        this.exit(1);
    }
    const projectType = pankodConfig.projectType;
    process.stdout.write(chalk.default(figlet.textSync(text[projectType])) + '\n');
};
exports.default = hook;
