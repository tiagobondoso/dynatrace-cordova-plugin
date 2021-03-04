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
        yield modifyPackageJson();
        modifyConfigXml();
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
function modifyPackageJson() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pathToPackageJson = pathConstants.getApplicationPackage();
            let packageJson = yield fileOperation.readTextFromFile(pathToPackageJson);
            let packageJsonParsed = JSON.parse(packageJson);
            if (packageJsonParsed.cordova !== undefined && packageJsonParsed.cordova.plugins !== undefined) {
                packageJsonParsed.cordova.plugins["@dynatrace/cordova-plugin"] = {};
                delete packageJsonParsed.cordova.plugins["dynatrace-cordova-plugin"];
            }
            yield fileOperation.writeTextToFile(pathToPackageJson, JSON.stringify(packageJsonParsed, null, "\t"));
        }
        catch (e) {
            logger_1.default.logMessageSync("Could not find package.json!", logger_1.default.WARNING);
        }
    });
}
function modifyConfigXml() {
    try {
        const { ConfigParser } = require('cordova-common');
        let cfg = new ConfigParser(nodePath.join(pathConstants.getApplicationPath(), "config.xml"));
        let plugin = cfg.getPlugin("dynatrace-cordova-plugin");
        if (plugin === undefined) {
            return;
        }
        let pluginWithAt = cfg.getPlugin("@dynatrace/cordova-plugin");
        if (pluginWithAt === undefined) {
            cfg.addPlugin({ name: "@dynatrace/cordova-plugin", spec: plugin.spec });
        }
        cfg.removePlugin("dynatrace-cordova-plugin");
        cfg.write();
    }
    catch (e) {
        logger_1.default.logMessageSync("Config.xml is not available - Can not modify Dynatrace dependency", logger_1.default.WARNING);
    }
}
