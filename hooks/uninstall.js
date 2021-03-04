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
const fileOp = require("./fileOperationHelper");
const pathConst = require("./pathsConstants");
const android = require("./android");
const ios_1 = require("./ios");
const nodePath = require("path");
const { ConfigParser } = require('cordova-common');
module.exports = function (context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (context !== undefined && context.opts !== undefined && context.opts.plugins !== undefined) {
            let plugins = context.opts.plugins;
            if (plugins.includes("@dynatrace/cordova-plugin")) {
                let index = plugins.indexOf("@dynatrace/cordova-plugin");
                plugins[index] = "dynatrace-cordova-plugin";
                modifyConfigXml();
                yield modifyPackageJson();
                yield removeGradleModification();
                yield removePListModification();
            }
        }
    });
};
function modifyPackageJson() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pathToPackageJson = pathConst.getApplicationPackage();
            let packageJson = yield fileOp.readTextFromFile(pathToPackageJson);
            let packageJsonParsed = JSON.parse(packageJson);
            if (packageJsonParsed.scripts != undefined) {
                delete packageJsonParsed.scripts.instrumentDynatrace;
            }
            if (packageJsonParsed.cordova !== undefined && packageJsonParsed.cordova.plugins !== undefined) {
                delete packageJsonParsed.cordova.plugins["@dynatrace/cordova-plugin"];
                delete packageJsonParsed.cordova.plugins["dynatrace-cordova-plugin"];
            }
            if (packageJsonParsed.dependencies !== undefined) {
                delete packageJsonParsed.dependencies["@dynatrace/cordova-plugin"];
            }
            if (packageJsonParsed.devDependencies !== undefined) {
                delete packageJsonParsed.devDependencies["@dynatrace/cordova-plugin"];
            }
            yield fileOp.writeTextToFile(pathToPackageJson, JSON.stringify(packageJsonParsed));
        }
        catch (e) {
            console.log(e);
            logger_1.default.logMessageSync("Could not find package.json - please remove instrumentDynatrace script manually!", logger_1.default.WARNING, true);
        }
    });
}
function removeGradleModification() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let path = yield fileOp.checkIfFileExists(nodePath.join(pathConst.getAndroidPath(), "build.gradle"));
            try {
                android.instrumentAndroidPlatform(path, true);
            }
            catch (e) {
                logger_1.default.logMessageSync("Removal of Gradle modification didnt work!", logger_1.default.ERROR, true);
            }
        }
        catch (e) {
        }
    });
}
function removePListModification() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fileOp.checkIfFileExists(pathConst.getIosPath());
            try {
                yield ios_1.default.modifyPListFile(undefined, undefined, true);
            }
            catch (e) {
                logger_1.default.logMessageSync("Removal of PList modification didnt work!", logger_1.default.ERROR, true);
            }
        }
        catch (e) {
        }
    });
}
function modifyConfigXml() {
    try {
        let cfg = new ConfigParser(nodePath.join(pathConst.getApplicationPath(), "config.xml"));
        cfg.removePlugin("@dynatrace/cordova-plugin");
        cfg.write();
    }
    catch (e) {
        logger_1.default.logMessageSync("Config.xml is not available - Can not modify Dynatrace dependency", logger_1.default.WARNING);
    }
}
