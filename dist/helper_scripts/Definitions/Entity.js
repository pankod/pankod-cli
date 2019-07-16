"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const inquirer = require("inquirer");
//#endregion Global Imports
//#region Local Imports
const config_1 = require("../../config");
const Helper_1 = require("./Helper");
//#endregion Local Imports
exports.modelQuestion = {
    showQuestions: () => __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                message: 'Enter entity name',
                name: 'fileName',
                type: 'input',
                validate(val) {
                    if (val.length) {
                        if (Helper_1.Helper.isAlreadyExist(config_1.Config.repositoriesDir, val, true)) {
                            return 'Already added use new entity name';
                        }
                        return true;
                    }
                    return 'Cannot be empty';
                }
            }
        ];
        const answers = yield inquirer.prompt(questions);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        Helper_1.Helper.createRepository(answers);
    })
};
//# sourceMappingURL=Entity.js.map