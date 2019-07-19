import { fs } from 'memfs';
import { CommonHelper } from '../../../src/Scripts/Common';
import { ICommon } from '../../../src/Scripts/ICommon';

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
		const config = CommonHelper.getPankodConfig();

		expect(config).toEqual({ projectType: 'test', plugins: ['test'] } );
	});
});
