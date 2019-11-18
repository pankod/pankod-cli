// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
// #endregion Local Imports

export const addActionConstIndex = (
    templateProps: ICommon.ITemplateProps,
    params: INextjsHelper.IAddActionConstIndexParams
): void => {
    const { actionConstTemplatePath } = params;

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${Config.nextjs.definitionsDir}/ActionConsts.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${Config.nextjs.definitionsDir}/ActionConsts.ts`),
            'utf8'
        ),
        getFileContent: () => CommonHelper.getTemplate(actionConstTemplatePath, templateProps),
        message: 'Action constants added to Definitions/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };

    CommonHelper.replaceContent(replaceContentParams);
};
