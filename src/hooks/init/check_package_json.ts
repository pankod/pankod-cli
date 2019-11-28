import * as chalk from 'chalk';
import * as figlet from 'figlet';
import { Hook } from '@oclif/config';

import { IPankodConfig, IText } from '../../modules/typings';
import { getPankodConfig } from '../../modules/utils';

const text: IText = {
    moleculer: 'Pankod Moleculer CLI',
    nextjs: 'Pankod NextJS CLI',
    svelte: 'Pankod Svelte CLI',
    nextjs2: 'Pankod NextJS CLI',
    pankodCli: 'Pankod CLI'
};

const hook: Hook<'init'> = async function() {
    const pankodConfig: IPankodConfig = getPankodConfig();

    if (!pankodConfig) {
        this.error('Please specify pankod.project in package.json');
        this.exit(1);
    }

    const project: string = pankodConfig.project || pankodConfig.projectType;

    process.stdout.write(chalk.default(figlet.textSync(text[project])) + '\n');
};

export default hook;
