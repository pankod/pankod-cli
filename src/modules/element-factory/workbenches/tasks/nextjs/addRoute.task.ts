// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
// #endregion Local Imports

export const addRoute = (
    answers: ICommon.IAnswers,
    IAddRoutesReplaceParams: INextjsHelper.IAddRoutesReplaceParams
) => {
    const { hasPath = false, routePath, fileName } = answers;

    const templateProps = {
        fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
        hasPath,
        routePath
    };

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: IAddRoutesReplaceParams.routesDir,
        filetoUpdate: fs.readFileSync(path.resolve('', IAddRoutesReplaceParams.routesDir), 'utf8'),
        getFileContent: () =>
            CommonHelper.getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
        message: `Route added to routes.js as ${
            hasPath ? `'/${routePath}'` : `'/${fileName}/index'`
        }`,
        regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm
    };

    CommonHelper.replaceContent(replaceContentParams);
};
