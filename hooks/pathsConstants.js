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
exports.getDynatraceGradleFile = exports.getLogPath = exports.getCurrentLogPath = exports.getSwallowApiPath = exports.getDownloadJSAgentPath = exports.getIOSAssetsPath = exports.getAndroidAssetsPath = exports.getConfigFilePath = exports.getDefaultConfig = exports.getAndroidGradleFile = exports.getPluginPath = exports.getPluginPackage = exports.getAndroidPath = exports.getIosPath = exports.getApplicationPackage = exports.getApplicationPath = exports.setRoot = exports.FILE_SWALLOW_API = exports.FILE_JSAGENT = exports.FOLDER_ASSETS = void 0;
const fileOperationHelper_1 = require("./fileOperationHelper");
const path = require("path");
const FOLDER_PLATFORMS = "platforms";
exports.FOLDER_ASSETS = "assets";
const FOLDER_WWW = "www";
const FOLDER_SCRIPTS = "hooks";
const FOLDER_FILES = "files";
const FOLDER_SRC_ANDROID = path.join("src","android");
const FOLDER_SRC_IOS = path.join("src","ios");
const FOLDER_SRC = "src";
const FOLDER_LOGS = "logs";
const FOLDER_ANDROID_APP = "app";
const FILE_PACKAGE = "package.json";
const FILE_CONFIG = "dynatrace.config.js";
const FILE_CURRENT_LOG = "currentLog.txt";
exports.FILE_JSAGENT = "dtAgent.js";
exports.FILE_SWALLOW_API = "dtrum-swallow-api.js";
var rootPath = __dirname;
function setRoot(newRoot) {
    rootPath = path.resolve(newRoot);
}
exports.setRoot = setRoot;
function getPluginPath() {
    return path.join(rootPath, "..");
}
exports.getPluginPath = getPluginPath;
function getDefaultConfig() {
    return path.join(getPluginPath(), FOLDER_SRC, "default.config.js");
}
exports.getDefaultConfig = getDefaultConfig;
function getDynatraceGradleFile() {
    return path.join(getPluginPath(), FOLDER_SRC_ANDROID, "dynatrace.gradle");
}
exports.getDynatraceGradleFile = getDynatraceGradleFile;
function getApplicationPath() {
    return path.join(getPluginPath(), "..", "..");
}
exports.getApplicationPath = getApplicationPath;
function getPluginPackage() {
    return path.join(getPluginPath(), FILE_PACKAGE);
}
exports.getPluginPackage = getPluginPackage;
function getApplicationPackage() {
    return path.join(getApplicationPath(), FILE_PACKAGE);
}
exports.getApplicationPackage = getApplicationPackage;
function getIosPath() {
    return path.join(getApplicationPath(), FOLDER_PLATFORMS, "ios");
}
exports.getIosPath = getIosPath;
function getAndroidPath() {
    return path.join(getApplicationPath(), FOLDER_PLATFORMS, "android");
}
exports.getAndroidPath = getAndroidPath;
function getAndroidGradleFile(androidFolder) {
    return path.join(androidFolder, "build.gradle");
}
exports.getAndroidGradleFile = getAndroidGradleFile;
function getConfigFilePath() {
    return path.join(getApplicationPath(), FILE_CONFIG);
}
exports.getConfigFilePath = getConfigFilePath;
function getAndroidAssetsPath() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fileOperationHelper_1.checkIfFileExists(path.join(getAndroidPath(), exports.FOLDER_ASSETS, FOLDER_WWW));
        }
        catch (e) {
            return path.join(getAndroidPath(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, FOLDER_WWW);
        }
    });
}
exports.getAndroidAssetsPath = getAndroidAssetsPath;
function getIOSAssetsPath() {
    return path.join(getIosPath(), FOLDER_WWW);
}
exports.getIOSAssetsPath = getIOSAssetsPath;
function getDownloadJSAgentPath() {
    return path.join(getPluginPath(), FOLDER_FILES, exports.FILE_JSAGENT);
}
exports.getDownloadJSAgentPath = getDownloadJSAgentPath;
function getSwallowApiPath() {
    return path.join(getPluginPath(), FOLDER_SCRIPTS, exports.FILE_SWALLOW_API);
}
exports.getSwallowApiPath = getSwallowApiPath;
function getCurrentLogPath() {
    return path.join(getLogPath(), FILE_CURRENT_LOG);
}
exports.getCurrentLogPath = getCurrentLogPath;
function getLogPath() {
    return path.join(getPluginPath(), FOLDER_LOGS);
}
exports.getLogPath = getLogPath;
