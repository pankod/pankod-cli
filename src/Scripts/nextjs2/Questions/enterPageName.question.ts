import * as inquirer from 'inquirer';
import { CommonHelper } from '../../Common';
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';

export const enterPageName: inquirer.InputQuestion<ICommon.IAnswers> = {
    message: 'Enter page name',
    name: 'fileName',
    type: 'input',
    validate(val: string): string | boolean {
        return CommonHelper.validate(val, Config.nextjs2.pagesDir, false, 'page');
    }
};
