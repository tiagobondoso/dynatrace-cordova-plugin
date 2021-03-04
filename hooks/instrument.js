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
const config = require("./config");
const android = require("./android");
const fileOperation = require("./fileOperationHelper");
const pathConstants = require("./pathsConstants");
const path = require("path");
const ios_1 = require("./ios");
const downloadAgent_1 = require("./downloadAgent");
const instrumentHtml_1 = require("./instrumentHtml");
const nodePath = require("path");
const updateSecurity_1 = require("./updateSecurity");
const CONFIG_GRADLE_FILE = "--gradle";
const CONFIG_PLIST_FILE = "--plist";
const CONFIG_FILE = "--config";
const CONFIG_JSAGENT_FILE = "--jsagent";
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.logMessageSync("Starting Configuration of Cordova application ..", logger_1.default.INFO);
        showVersionOfPlugin();
        let pathToConfig = pathConstants.getConfigFilePath();
        let pathToGradle = pathConstants.getAndroidGradleFile(pathConstants.getAndroidPath());
        let androidAvailable = true;
        let pathToPList = undefined;
        let iosAvailable = true;
        let pathToJsAgent = undefined;
        let jsagentContent = undefined;
        var argv = parseCommandLine(process.argv.slice(2));
        if (argv.config !== undefined) {
            pathToConfig = argv.config;
        }
        if (argv.gradle !== undefined) {
            pathToGradle = nodePath.resolve(argv.gradle);
            androidAvailable = isPlatformAvailable(pathToGradle, "Android");
        }
        else {
            androidAvailable = isPlatformAvailable(pathConstants.getAndroidPath(), "Android");
        }
        if (argv.plist !== undefined) {
            pathToPList = nodePath.resolve(argv.plist);
            iosAvailable = isPlatformAvailable(pathToPList, "iOS");
        }
        else {
            iosAvailable = isPlatformAvailable(pathConstants.getIosPath(), "iOS");
        }
        if (argv.jsagent !== undefined) {
            try {
                logger_1.default.logMessageSync("Checking if JSAgent file exists ..", logger_1.default.INFO);
                pathToJsAgent = fileOperation.checkIfFileExistsSync(argv.jsagent);
                logger_1.default.logMessageSync("JSAgent found at: " + pathToJsAgent, logger_1.default.INFO);
            }
            catch (ex) {
                logger_1.default.logMessageSync("JSAgent not found: " + ex, logger_1.default.WARNING);
            }
        }
        pathToConfig = nodePath.resolve(pathToConfig);
        pathToGradle = nodePath.resolve(pathToGradle);
        if (iosAvailable || androidAvailable) {
            instrumentHtml_1.removeOldDtAgent(pathConstants.getDownloadJSAgentPath());
            try {
                logger_1.default.logMessageSync("Trying to read configuration file: " + pathToConfig, logger_1.default.INFO);
                let configJson = config.readConfig(pathToConfig);
                if (pathToJsAgent !== undefined) {
                    jsagentContent = yield fileOperation.readTextFromFile(pathToJsAgent);
                }
                else {
                    jsagentContent = yield downloadAgent_1.downloadAgent(configJson);
                }
                if (androidAvailable) {
                    try {
                        logger_1.default.logMessageSync("Starting Android Configuration with Dynatrace!", logger_1.default.INFO);
                        android.instrumentAndroidPlatform(pathToGradle, false);
                        android.writeGradleConfig(configJson.android);
                        let androidAssetPath = yield pathConstants.getAndroidAssetsPath();
                        instrumentHtml_1.removeOldDtAgent(path.join(androidAssetPath, "assets", "dtAgent.js"));
                        if (jsagentContent == undefined) {
                            logger_1.default.logMessageSync("Not instrumenting HTML files since there is no available JSAgent to inject!", logger_1.default.WARNING);
                        }
                        else {
                            yield instrumentHtml_1.instrumentHtml(androidAssetPath, jsagentContent);
                            yield updateSecurity_1.updateSecurity(androidAssetPath, configJson);
                        }
                    }
                    catch (e) {
                        logger_1.default.logMessageSync(e.message, logger_1.default.ERROR);
                    }
                    finally {
                        logger_1.default.logMessageSync("Finished Android Configuration with Dynatrace!", logger_1.default.INFO);
                    }
                }
                if (iosAvailable) {
                    try {
                        logger_1.default.logMessageSync("Starting iOS Configuration with Dynatrace!", logger_1.default.INFO);
                        yield ios_1.default.modifyPListFile(pathToPList, configJson.ios, false);
                        instrumentHtml_1.removeOldDtAgent(path.join(pathConstants.getIOSAssetsPath(), "assets", "dtAgent.js"));
                        if (jsagentContent == undefined) {
                            logger_1.default.logMessageSync("Not instrumenting HTML files since there is no available JSAgent to inject!", logger_1.default.WARNING);
                        }
                        else {
                            yield instrumentHtml_1.instrumentHtml(pathConstants.getIOSAssetsPath(), jsagentContent);
                            yield updateSecurity_1.updateSecurity(pathConstants.getIOSAssetsPath(), configJson);
                        }
                    }
                    catch (e) {
                        logger_1.default.logMessageSync(e.message, logger_1.default.ERROR);
                    }
                    finally {
                        logger_1.default.logMessageSync("Finished iOS Configuration with Dynatrace!", logger_1.default.INFO);
                    }
                }
            }
            catch (e) {
                logger_1.default.logMessageSync(e, logger_1.default.ERROR);
                if (e instanceof downloadAgent_1.StopBuildError) {
                    throw e;
                }
            }
        }
        else {
            logger_1.default.logMessageSync("Both Android and iOS Folder are not available - Skip Configuration.", logger_1.default.WARNING);
        }
        logger_1.default.logMessageSync("Finished Configuration of Cordova application ..", logger_1.default.INFO);
        logger_1.default.closeLogFile();
    });
};
function showVersionOfPlugin() {
    try {
        let packageJsonContent = fileOperation.readTextFromFileSync(pathConstants.getPluginPackage());
        let packageJsonContentObj = JSON.parse(packageJsonContent);
        logger_1.default.logMessageSync("Dynatrace Cordova Plugin - Version " + packageJsonContentObj.version, logger_1.default.INFO);
    }
    catch (e) {
        logger_1.default.logMessageSync("Dynatrace Cordova Plugin - Version NOT READABLE", logger_1.default.WARNING);
    }
}
function parseCommandLine(inputArgs) {
    let parsedArgs = {};
    inputArgs.forEach(function (entry) {
        let parts = entry.split("=");
        if (parts.length == 2) {
            switch (parts[0]) {
                case CONFIG_GRADLE_FILE:
                    parsedArgs.gradle = parts[1];
                    break;
                case CONFIG_FILE:
                    parsedArgs.config = parts[1];
                    break;
                case CONFIG_PLIST_FILE:
                    parsedArgs.plist = parts[1];
                    break;
                case CONFIG_JSAGENT_FILE:
                    parsedArgs.jsagent = parts[1];
                    break;
            }
        }
    });
    return parsedArgs;
}
function isPlatformAvailable(path, platform) {
    try {
        fileOperation.checkIfFileExistsSync(path);
        return true;
    }
    catch (e) {
        logger_1.default.logMessageSync(`${platform} Location doesn't exist - Skip ${platform} instrumentation and configuration.`, logger_1.default.WARNING);
        return false;
    }
}
