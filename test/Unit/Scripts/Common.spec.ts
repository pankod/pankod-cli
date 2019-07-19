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

	describe('isAlreadyExist', () => {
		describe('page', () => {
			describe('when page exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/pages',
						'test',
						false,
						'page'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when page doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/pages',
						'non-existent-page',
						false,
						'page'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});

		describe('service', () => {
			describe('when service exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/services',
						'test',
						false,
						'service'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when service doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/services',
						'non-existent-service',
						false,
						'service'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});

		describe('helper', () => {
			describe('when helper exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/helpers',
						'test',
						true,
						'helper'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when helper doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/helpers',
						'non-existent-helper',
						true,
						'helper'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		})

		describe('folder', () => {
			describe('when folder exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app',
						'test'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when folder doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app2'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		})
	});
});
