import * as inquirer from 'inquirer';
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';

export const enterComponentName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper
            .validate(val, Config.nextjs2.componentsDir, false, 'component');
    }
};
