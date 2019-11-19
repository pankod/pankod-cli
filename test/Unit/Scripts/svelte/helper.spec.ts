import { fs } from 'memfs';
import * as Helpers from '../../../../src/Scripts/svelte/Helpers';
import { CommonHelper } from '../../../../src/Scripts/Common';
import { ICommon } from '../../../../src/Scripts/ICommon';

describe('Helpers tests', () => {
    describe('Test createComponent method', () => {
        it('Should create component file', () => {
            const answers = {
                fileName: 'Comptest',
                hasStyle: true,
                lowerFileName: 'comptest'
            };

            Helpers.createComponent(answers);

            const fileContent = CommonHelper.getTemplate(
                '/Templates/svelte/Components/Component.mustache',
                answers
            );

            const createdComponent = String(
                fs.readFileSync('/src/Components/Comptest/index.svelte')
            );

            expect(createdComponent).toBe(fileContent);
        });
    });

    describe('Test createStyle method', () => {
        it('Should create style file', () => {
            const answers = {
                fileName: 'Style',
                hasStyle: true,
                lowerFileName: 'style'
            };

            Helpers.createStyle(answers);

            const fileContent = CommonHelper.getTemplate(
                '/Templates/svelte/Styles.mustache',
                answers
            );
            const createdStyle = String(fs.readFileSync('./src/Components/Style/style.scss'));

            expect(createdStyle).toBe(fileContent);
        });
    });

    describe('Test createTest method', () => {
        it('Should create component test file', () => {
            const answers: ICommon.IAnswers = {
                fileName: 'Comptest'
            };
            const templateProps = {
                fileName: answers.fileName
            };

            const options: ICommon.ICreateTest = {
                answers,
                dirPath: '/src/Components/Comptest/index.spec.js',
                successMessage: 'Added new Component test.',
                templatePath: '/Templates/svelte/Tests/Test.mustache',
                templateProps
            };

            Helpers.createTest(options);

            const fileContent = CommonHelper.getTemplate(options.templatePath, answers);
            const createdTest = String(fs.readFileSync('/src/Components/Comptest/index.spec.js'));

            expect(createdTest).toBe(fileContent);
        });
    });
});
