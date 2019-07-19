import { fs } from 'memfs';
import { CommonHelper } from '../../../src/Scripts/Common';
import { ICommon } from '../../../src/Scripts/ICommon';
import { Plugins } from '../../../src/Scripts/nextjs/pluginsEnum';

describe('Common Helper', () => {
	describe('addToIndex', () => {
		it('should add index file', async () => {
			const fileContent = `export { test } from 'test'`;
			const addToIndexParams: ICommon.IAddIndex = {
				dirPath: '/src/Templates/index.ts',
				getFileContent: () => fileContent,
				message: 'Test index added'
			};

			CommonHelper.addToIndex(addToIndexParams);

			const addedIndex = fs.readFileSync('/src/Templates/index.ts');

			expect(String(addedIndex)).toEqual(`${fileContent}\n`);
		});
	});

	describe('createFile', () => {
		it('should create file', () => {
			CommonHelper.createFile('/src/test.ts');

			expect(fs.existsSync('/src/test.ts')).toEqual(true);
		});
	});

	describe('getPankodConfig', () => {
		it('should get config', () => {
			const config = CommonHelper.getPankodConfig();

			expect(config).toEqual({ projectType: 'test', plugins: ['styled'] });
		});
	});

	describe('getTemplate', () => {
		it('should get template', () => {
			const template = CommonHelper.getTemplate(
				'/src/Templates/nextjs/nextjs.mustache',
				{ fileName: 'test' }
			);

			expect(template).toEqual('Test template nextjs.mustache test');
		});
	});

	describe('hasPlugin', () => {
		describe('when plugin exist', () => {
			it('should return true', () => {
				const hasPlugin = CommonHelper.hasPlugin(Plugins.styled);

				expect(hasPlugin).toEqual(true);
			});
		});

		describe('when plugin doesnt exist', () => {
			it('should return false', () => {
				const hasPlugin = CommonHelper.hasPlugin(Plugins.sass);

				expect(hasPlugin).toEqual(false);
			});
		});
	});
});
