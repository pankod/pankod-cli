// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjs2Helper } from '../../../../typings';
import { getTemplate, replaceContent } from '../../operations';
// #region Local Imports

export const addActionConstIndex = (
    templateProps: ICommon.ITemplateProps,
    params: INextjs2Helper.IAddActionConstIndexParams
): void => {
    const { actionConstTemplatePath, actionConstsFileDir } = params;

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: actionConstsFileDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', actionConstsFileDir),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(actionConstTemplatePath, templateProps),
        message:
            'Action constants added to Definitions/ActionConsts/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };

    replaceContent(replaceContentParams);
};
