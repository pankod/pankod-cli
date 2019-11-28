// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjs2Helper } from '../../../../typings';
import { getTemplate, replaceContent } from '../../operations';
// #region Local Imports

export const addRoute = (
    answers: ICommon.IAnswers,
    IAddRoutesReplaceParams: INextjs2Helper.IAddRoutesReplaceParams
) => {
    const { hasPath, routePath, fileName, lowerFileName } = answers;

    const templateProps = {
        fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
        hasPath,
        routePath
    };

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: IAddRoutesReplaceParams.routesDir,
        filetoUpdate: fs.readFileSync(
            path.resolve('', IAddRoutesReplaceParams.routesDir),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
        message: `Route added to routes.ts as ${
            hasPath ? `'/${routePath}'` : `'/${lowerFileName}/index'`
        }`,
        regexKey: /^(?:[\t ]*(?:\r?\n|\r))+export default routes;(?:\n*)/gm
    };

    replaceContent(replaceContentParams);
};
