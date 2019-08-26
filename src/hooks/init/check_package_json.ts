import * as chalk from 'chalk';
import * as figlet from 'figlet';
import { Hook } from '@oclif/config';

import { IPankodConfig, IText } from '../../ITypes';
import { CommonHelper } from '../../Scripts/Common';

const text: IText = {
	moleculer: 'Pankod Moleculer CLI',
	nextjs: 'Pankod NextJS CLI',
	svelte: 'Pankod Svelte CLI',
	pankodCli: 'Pankod CLI'
};

const hook: Hook<'init'> = async function () {
	const pankodConfig: IPankodConfig = CommonHelper.getPankodConfig();

	if (!pankodConfig) {
		this.error('Please specify pankod.projectType in package.json');
		this.exit(1);
	}

	const projectType: string = pankodConfig.projectType;

	process.stdout.write(
		chalk.default(
			figlet.textSync(text[projectType])
		) + '\n'
	);
};

export default hook;
