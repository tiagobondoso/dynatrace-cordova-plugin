"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MISSING_ANDROID_HYBRID_BLOCK = exports.MFP_VERSION_NOT_SUPPORTED = exports.GRADLE_VERSION_NOT_FOUND = exports.GRADLE_VERSION_NOT_SUPPORTED = exports.JSAGENT_REQ = exports.MFP_REQ = exports.NATIVE_REQ = exports.SEE_RESOLUTION = exports.MORE_INFO = exports.NATIVE_MFP_REQUESTS_REQ = exports.NO_PROBLEMS = exports.NO_DEPENDENCIES = exports.PLATFORM_ANDROID = exports.PLATFORM_IOS = exports.DEPENDENCIES_HEADING = exports.IMPORTANT_HEADING = exports.PROBLEMS_REC_HEADING = exports.NATIVE_DEPENDENCIES_HEADING = exports.BUILD_FRAMEWORK_HEADING = exports.PLUGIN_VERSION_HEADING = exports.DOCTOR_DYNATRACE_HEADING = exports.NPM_CHANGELOG_DOC = exports.NPM_GRADLE_DOC = exports.NPM_IOS_CORR_ISSUES_DOC = exports.NPM_NATIVE_WR_DOC = exports.NPM_MFP_DOC = exports.NPM_CUSTOM_ARGS_DOC = exports.NPM_HYBRID_CONFIG = exports.NPM_DYNATRACE_CONFIG_DOC = exports.GRADLE_MIN_VERSION = exports.MFP_MIN_VERSION = exports.DEPENDENCY_LIST = exports.MFP_DEPENDENCY_NAME = exports.RESET = exports.REVERSE = exports.UNDERLINED = exports.BOLD = exports.BG_CYAN = exports.CYAN_FONT = exports.YELLOW_FONT = exports.GREEN_FONT = exports.RED_FONT = exports.STAR = exports.ALERT = exports.WARN = exports.TADA = exports.RED_X = exports.GREEN_CHECK = exports.DYNATRACE_NPM_PACKAGE_NAME = exports.NPM_PACKAGE_INFO_API = void 0;
exports.PLUGIN_UPDATE_RECOMMEND = exports.PLUGIN_UP_TO_DATE = exports.PLUGIN_LATEST = exports.PLUGIN_CURRENT = exports.MISSING_GRADLE = exports.MISSING_PLIST = exports.MISSING_DYNATRACE_CONFIG = exports.MISSING_IOS_DOMAIN_PROP = exports.MISSING_IOS_HYBRID_PROP = void 0;
exports.NPM_PACKAGE_INFO_API = 'https://registry.npmjs.org/@dynatrace/cordova-plugin/latest';
exports.DYNATRACE_NPM_PACKAGE_NAME = '@dynatrace/cordova-plugin';
exports.GREEN_CHECK = '✅';
exports.RED_X = '❌';
exports.TADA = '🎉';
exports.WARN = '❗️';
exports.ALERT = '🚨';
exports.STAR = '⭐️';
exports.RED_FONT = '\x1b[31m';
exports.GREEN_FONT = '\x1b[32m';
exports.YELLOW_FONT = '\x1b[33m';
exports.CYAN_FONT = '\x1b[36m';
exports.BG_CYAN = '\x1b[46m';
exports.BOLD = '\u001B[1m';
exports.UNDERLINED = '\x1b[4m';
exports.REVERSE = '\x1b[7m';
exports.RESET = '\x1b[0m';
exports.MFP_DEPENDENCY_NAME = 'cordova-plugin-mfp';
exports.DEPENDENCY_LIST = ['@ionic-native/http', 'cordova-plugin-advanced-http', exports.MFP_DEPENDENCY_NAME, 'cordova-plugin-okhttp'];
exports.MFP_MIN_VERSION = '8.0.0';
exports.GRADLE_MIN_VERSION = 5;
exports.NPM_DYNATRACE_CONFIG_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#2-configuration-with-dynatrace").concat(exports.RESET, "\n");
exports.NPM_HYBRID_CONFIG = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#hybrid-related-configuration").concat(exports.RESET, "\n");
exports.NPM_CUSTOM_ARGS_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#3-make-a-build").concat(exports.RESET, "\n");
exports.NPM_MFP_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#ibm-mobile-first").concat(exports.RESET, "\n");
exports.NPM_NATIVE_WR_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#native-webrequests").concat(exports.RESET, "\n");
exports.NPM_IOS_CORR_ISSUES_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#ios-session-correlation-issues").concat(exports.RESET, "\n");
exports.NPM_GRADLE_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#updating-to-gradle-5").concat(exports.RESET, "\n");
exports.NPM_CHANGELOG_DOC = "".concat(exports.CYAN_FONT, "https://www.npmjs.com/package/@dynatrace/cordova-plugin#changelog").concat(exports.RESET, "\n");
exports.DOCTOR_DYNATRACE_HEADING = "==================================\n| \uD83C\uDFE5 ".concat(exports.UNDERLINED).concat(exports.BOLD, "Doctor Dynatrace Results").concat(exports.RESET, " \uD83D\uDCF1 |\n==================================");
exports.PLUGIN_VERSION_HEADING = "".concat(exports.BOLD, "----------------------------\n| Dynatrace Plugin Version |\n----------------------------").concat(exports.RESET);
exports.BUILD_FRAMEWORK_HEADING = "".concat(exports.BOLD, "-------------------\n| Build Framework |\n-------------------").concat(exports.RESET);
exports.NATIVE_DEPENDENCIES_HEADING = "".concat(exports.BOLD, "-----------------------------------\n| Native Web Request Dependencies |\n-----------------------------------").concat(exports.RESET);
exports.PROBLEMS_REC_HEADING = "".concat(exports.BOLD, "---------------\n| ").concat(exports.RED_X, " Problems |\n| ").concat(exports.GREEN_CHECK, " Solution |\n---------------").concat(exports.RESET);
exports.IMPORTANT_HEADING = "\n\n".concat(exports.BOLD, "-------------------\n| ").concat(exports.ALERT).concat(exports.YELLOW_FONT).concat(exports.BOLD, " IMPORTANT ").concat(exports.RESET).concat(exports.ALERT).concat(exports.BOLD, " |\n-------------------").concat(exports.RESET, "\n");
exports.DEPENDENCIES_HEADING = "".concat(exports.BOLD, "--------------------\n| All dependencies |\n--------------------").concat(exports.RESET);
exports.PLATFORM_IOS = 'iOS';
exports.PLATFORM_ANDROID = 'Android';
exports.NO_DEPENDENCIES = 'None found';
exports.NO_PROBLEMS = "\n".concat(exports.TADA).concat(exports.GREEN_FONT).concat(exports.BOLD, " No problems found! ").concat(exports.RESET).concat(exports.TADA, "\n");
exports.NATIVE_MFP_REQUESTS_REQ = "will require an instrumented webserver with version ".concat(exports.GREEN_FONT).concat(exports.BOLD, ">= 1.211.x.").concat(exports.RESET);
exports.MORE_INFO = "\n".concat(exports.GREEN_FONT).concat(exports.BOLD, "More info:").concat(exports.RESET);
exports.SEE_RESOLUTION = "\n\n".concat(exports.GREEN_FONT).concat(exports.BOLD, "Fix:").concat(exports.RESET);
exports.NATIVE_REQ = "\nUsing the Native WebRequests feature ".concat(exports.NATIVE_MFP_REQUESTS_REQ, "\n").concat(exports.MORE_INFO, "\n").concat(exports.NPM_NATIVE_WR_DOC, "\n");
exports.MFP_REQ = "\nUsing the IBM Mobile First feature ".concat(exports.NATIVE_MFP_REQUESTS_REQ, "\n").concat(exports.MORE_INFO, "\n").concat(exports.NPM_MFP_DOC, "\n");
exports.JSAGENT_REQ = "\nWhen using capacitor/ionic with iOS, to ensure the Mobile and Web sessions correlate properly, version ".concat(exports.GREEN_FONT).concat(exports.BOLD, "1.219+").concat(exports.RESET, " of the JavaScript agent is required!\n").concat(exports.MORE_INFO, "\n").concat(exports.NPM_IOS_CORR_ISSUES_DOC);
exports.GRADLE_VERSION_NOT_SUPPORTED = "\n".concat(exports.RED_X, " Android Gradle version ").concat(exports.RED_FONT).concat(exports.BOLD, "< 5 is not supported.").concat(exports.RESET, "\n--> ").concat(exports.GREEN_CHECK, " Please update your Android gradle to version ").concat(exports.GREEN_FONT).concat(exports.BOLD, ">= 5.x.x.").concat(exports.RESET, "\n\n\t").concat(exports.NPM_GRADLE_DOC);
exports.GRADLE_VERSION_NOT_FOUND = "\n".concat(exports.WARN, " Unable to locate gradle version.").concat(exports.RESET, "\n");
exports.MFP_VERSION_NOT_SUPPORTED = "\n".concat(exports.RED_X, " IBM Mobile First version ").concat(exports.RED_FONT).concat(exports.BOLD, "< 8.x.x is not supported.").concat(exports.RESET, "\n--> ").concat(exports.GREEN_CHECK, " Please update to version ").concat(exports.GREEN_FONT).concat(exports.BOLD, ">= 8.x.x").concat(exports.RESET, " to use this feature.");
exports.MISSING_ANDROID_HYBRID_BLOCK = "\n".concat(exports.RED_X, " Missing the Android hybridWebView block in the dynatrace.config.js file.\n--> ").concat(exports.GREEN_CHECK, " Add the hybridWebView block in the dynatrace.config.js file.\n\n\t").concat(exports.NPM_HYBRID_CONFIG);
exports.MISSING_IOS_HYBRID_PROP = "\n".concat(exports.RED_X, " Missing the iOS DTXHybridApplication property in the dynatrace.config.js file.\n--> ").concat(exports.GREEN_CHECK, " Update your dynatrace.config.js file to include the DTXHybridApplication property.\n\n\t").concat(exports.NPM_HYBRID_CONFIG);
exports.MISSING_IOS_DOMAIN_PROP = "\n".concat(exports.RED_X, " Missing the iOS DTXSetCookiesForDomain property in the dynatrace.config.js file.\n--> ").concat(exports.GREEN_CHECK, " Add the DTXSetCookiesForDomain property with your desired domains to your dynatrace.config.js file.\n\n\t").concat(exports.NPM_HYBRID_CONFIG);
exports.MISSING_DYNATRACE_CONFIG = "\n".concat(exports.RED_X, " Unable to find the dynatrace.config.js file in root directory.\n--> ").concat(exports.GREEN_CHECK, " If using a dynatrace.config.js file in a different location than the root directory, please use the custom CLI parameter --config=<locationOfConfig>\n\n\t").concat(exports.NPM_DYNATRACE_CONFIG_DOC);
exports.MISSING_PLIST = "\n".concat(exports.RED_X, " Unable to find Info.plist.\n--> ").concat(exports.GREEN_CHECK, " If using a plist in a different location than the project's default, please use the custom CLI parameter --plist=<locationOfPlist>\n\n\t").concat(exports.NPM_DYNATRACE_CONFIG_DOC);
exports.MISSING_GRADLE = "\n".concat(exports.RED_X, " Unable to find top-level build.gradle.\n--> ").concat(exports.GREEN_CHECK, " If using a gradle file in a different location than the project's default, please use the custom CLI parameter --gradle=<locationOfTopLevel-build.gradle>\n\n\t").concat(exports.NPM_DYNATRACE_CONFIG_DOC);
exports.PLUGIN_CURRENT = 'Current: ';
exports.PLUGIN_LATEST = 'Latest: ';
exports.PLUGIN_UP_TO_DATE = "\n".concat(exports.TADA).concat(exports.GREEN_FONT).concat(exports.BOLD, " Up to date! ").concat(exports.RESET).concat(exports.TADA, "\n");
exports.PLUGIN_UPDATE_RECOMMEND = "\n".concat(exports.STAR).concat(exports.BOLD).concat(exports.GREEN_FONT, " A newer plugin version is available! ").concat(exports.RESET).concat(exports.STAR, "\n\nPlease see our changelog and update for our latest features and bugfixes.\n--> ").concat(exports.NPM_CHANGELOG_DOC);