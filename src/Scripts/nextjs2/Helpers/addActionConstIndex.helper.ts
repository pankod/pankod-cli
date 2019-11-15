// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { INextjs2Helper } from '../INextjs2Types';
// #region Local Imports

export const addActionConstIndex = (
    templateProps: ICommon.ITemplateProps,
    params: INextjs2Helper.IAddActionConstIndexParams
): void => {
    const { actionConstTemplatePath, actionConstsFileDir } = params;

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: actionConstsFileDir,
        filetoUpdate: fs.readFileSync(path.resolve('', actionConstsFileDir), 'utf8'),
        getFileContent: () => CommonHelper.getTemplate(actionConstTemplatePath, templateProps),
        message: 'Action constants added to Definitions/ActionConsts/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };

    CommonHelper.replaceContent(replaceContentParams);
};
