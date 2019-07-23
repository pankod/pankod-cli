import { fs } from 'memfs';
import { Helper } from '../../../../src/Scripts/nextjs/helper';
import { CommonHelper } from '../../../../src/Scripts/Common';

describe('Helper tests', () => {
	it('Should run addRoute method correctly', () => {
		const addRouteParams = {
			routesDir: '/app/routes.js',
			routesTemplate: '/Templates/nextjs/Routes.mustache'
		};
		const answers = {
			fileName: 'test',
			hasPath: true,
			routePath: 'test-route'
		};
		// tslint:disable-next-line: max-line-length
		const fileContent = CommonHelper.getTemplate('/Templates/nextjs/Routes.mustache', answers);

		Helper.addRoute(answers, addRouteParams);

		const addedRoute = fs.readFileSync('/app/routes.js');
	 	expect(String(addedRoute)).toEqual(`${fileContent}`);
	});
});
