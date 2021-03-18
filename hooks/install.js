#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const fileOperation = require("./fileOperationHelper");
const pathConstants = require("./pathsConstants");
const config = require("./config");
const nodePath = require("path");
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield installDependencies();
        yield config.checkConfiguration();
    });
};
function installDependencies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fileOperation.checkIfFileExists(nodePath.join(pathConstants.getPluginPath(), "node_modules"));
        }
        catch (e) {
            logger_1.default.logMessageSync("Dependencies are not resolved - Will do npm install. Please wait!", logger_1.default.WARNING);
            const { execSync } = require('child_process');
            execSync('npm install', { cwd: pathConstants.getPluginPath() });
        }
    });
}
