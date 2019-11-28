// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjsHelper } from '../../../../typings';
import { getTemplate, replaceContent } from '../../operations';
import { nextjs } from '../../../../paths';
// #endregion Local Imports

export const addActionConstIndex = (
    templateProps: ICommon.ITemplateProps,
    params: INextjsHelper.IAddActionConstIndexParams
): void => {
    const { actionConstTemplatePath } = params;

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${nextjs.definitionsDir}/ActionConsts.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${nextjs.definitionsDir}/ActionConsts.ts`),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(actionConstTemplatePath, templateProps),
        message: 'Action constants added to Definitions/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };

    replaceContent(replaceContentParams);
};
