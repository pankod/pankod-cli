"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const questions = require("./questions/moleculer");
// #endregion Local Imports
exports.moleculer = {
    entity: [
        questions.entityName
    ],
    service: [
        questions.serviceName,
        questions.isPrivate,
        questions.hasDatabase
    ]
};
