[![N|Solid](https://assets.dynatrace.com/content/dam/dynatrace/misc/dynatrace_web.png)](https://dynatrace.com)

# Dynatrace Cordova Plugin

This plugin gives you the ability to use the Dynatrace instrumentation in your hybrid application Outsystems. It uses the Mobile Agent and the JavaScript Agent. The Mobile Agent will give you all device specific values containing lifecycle information and the JavaScript Agent will allow you to manually instrument your JavaScript/TypeScript code out of the box (TypeScript definitions included). The JavaScript Agent will cover the network calls (depending on your used libraries) and will automatically detect them.

## Requirements

* For Linux users: Bash (Only a requirement if you are using Linux)
* For Android users: Minimum SDK version 15
* For iOS users: Minimum iOS 8
* For JavaScript Agent: access to API of cluster
* Android: Gradle > 5.0 ([How to upgrade?](#gradleUpdate))
* Node: > 10.x

## <a name="versions"></a>Agent Versions

This agent versions are configured in this plugin:

* iOS Agent: 8.209.1.1003    
* Android Agent: 8.211.1.1010

## Quick Setup

1. [Installation of the plugin](#pluginVersion)
2. [Configuration with Dynatrace](#installationDynatrace)
3. [Make a build](#makeABuild)
4. [Validate instrumentation](#validation)

## Advanced Topics 

* [Cordova configuration](#cordovaConfiguration)
* [Mobile Agent configuration](#nativeProperties)
    * [Hybrid related configuration](#hybridnativeconfig)
* [JavaScript Agent configuration](#jsagentProperties)
    * [Allow any certificate for download](#allowanycert)
* [Manual instrumentation](#usageJsAgent)
    * [Create manual action](#manualAction)
    * [Report values](#reportValues)
    * [Identify user](#identifyUser)
    * [More examples](#moreexamples)
    * [Typings file for API](#typings)
* [Manual instrumentation - Mobile Agent](#usageMobileAgent)
    * [End session](#endvisit)
    * [Typings file for API](#typings)
* [Ionic Web View for Cordova](#ionicWebview)
* [Download older plugin version](#downloadOlderVersions)
* [Custom arguments](#customArguments)
* [Migration from old plugin](#migration)
* [Upgrading project to Gradle 5](#gradleUpdate)
* [Agent debug logs](#agentDebugLogs)
* [Official documentation](#documentation)
* [Troubleshooting and current restrictions](#trouble)
* [Changelog](#changelog)

# Quick Setup

## <a name="pluginVersion"></a>1. Installation of the plugin

To install the plugin in your Cordova based project you must enter the following command in the root directory of your cordova based project. E.g. :

```
cordova plugin add https://github.com/os-adv-dev/dynatrace-cordova-plugin --save
```

## <a name="installationDynatrace"></a>2. Configuration with Dynatrace

If you want to instrument your Cordova application just go to your Dynatrace WebUI and select the menu point "Deploy Dynatrace". Choose to setup mobile monitoring and select Cordova. Afterwards it is possible for you to add the Web part (JavaScript Agent) automatically and download the `dynatrace.config.js` file.
 
This file should be placed in the resources Folder in your outsystems mobile app with "deploy action" set to "deploy to target folder" and "target directory" set to "dynatraceConfig". If the file is not available the instrumentation will not work.

## <a name="validation"></a>4. Validate instrumentation

This section should explain what data should be visible after applying the plugin. The most important aspect is that there should be a `combined` session. We talk about a `combined` session when there are `Mobile` and `Web` actions within one session. 

[![N|Solid](https://dt-cdn.net/images/sessiondetail-975-bd15de64c8.png)]()

This screen shows what a `combined` sample user session should roughly look like. The session contains a `Mobile` action and some `Web(Load, XHR)` actions. Those first two actions should always be visible in your application session. The first one defines the native application startup ("Loading EasyTravel"). The second one defines the first load of the index.html of your hybrid application ("Loading of page ..").

# Advanced Topics

## <a name="cordovaConfiguration"></a>Cordova configuration

```js
module.exports = {
    cordova : {
        debug : false,
		    cspURL: "http://..."
	},
	...
}
```

### Content-Security-Policy url

There is flag for updating the CSP (Content Security Policy). By default this value is `set` and the plugin will modify the CSP. The URL in the `cspURL` property will be placed into a CSP configuration (if available) in your index.html. This will allow/unblock connections to the Dynatrace server. If you don't want to use this feature, remove the cspURL property and the plugin will not modify the CSP configuration.

### Debug

The default value is `false`. This property generates more log output and is sometimes necessary if you need to find the cause for a non-working plugin.

## <a name="nativeConfiguration"></a>Native configuration (iOS & Android)

```js
module.exports = {
    android : {
		config : `...`
    },

    ios : {
        config : `...`
    }  
}
```

The native configuration contain all the settings which are necessary for the Mobile Agent(s). You can find all the available properties in the [documentation](#documentation) of the mobile agent.

The content of the `ios.config` property will be directly copied to the plist file. The content of the `android.config` property will be directly copied to the gradle file.

### <a name="hybridnativeconfig"></a>Hybrid related configuration

Here we list the configuration which is especially important if you are instrumenting a Hybrid application.

```js
module.exports = {
    android : {
		config : `
		dynatrace{
			configurations {
				defaultConfig{
					autoStart{
						...
					}
					hybridWebView{
						enabled true
						domains '.example.com', '.dynatrace.com'
					}
				}
			}
		}
		`
    },

    ios : {
		config : `
		<DTXHybridApplication>true</DTXHybridApplication>
		<DTXSetCookiesForDomain>.example.com,dynatrace.com</DTXSetCookiesForDomain>
		`
    }  
}
```

* `DTXHybridApplication` or `hybridWebView.enabled` : Set to `true` if you have a Hybrid application. The default value is `false`.

* `DTXSetCookiesForDomain` or `hybridWebView.domains` : For hybrid applications using the JavaScript agent, cookies need to be set for each instrumented domain or server the application communicates with. You can specify domains, host or IP addresses. Domains or sub-domains must start with a dot. Separate the list elements with a comma.

## <a name="jsagentProperties"></a>JavaScript Agent configuration

Basically all needed properties for the JavaScript Agent are predefined by the downloadable `dynatrace.config.js`. There are three available properties: 
* `url` - Dynatrace API url to retrieve the JS agent script tag.
* `mode` - Values can be numbers 0-4 depending on what JavaScript Agent code snippet you want to use.
* `allowanycert` - Allows the plugin to ignore certificate issues when retrieving the JavaScript Agent.


### <a name="mode"></a>JavaScript Agent Snippet Mode

Using a specific mode can allow you during build to insert any of the available JavaScript agent code snippet options that are offered. 
[Click here](https://www.dynatrace.com/support/help/shortlink/agentless-rum#insertion-methods) for more details on the options listed below:
* 0 - `jsInlineScript` (Default)
* 1 - `jsTagComplete`
* 2 - `syncCS`
* 3 - `asyncCS`
* 4 - `jsTag`

```js
module.exports = {
    js : {
        url : `https://.../jsInlineScript/...`,
        mode: 2
    },
}
```


The above example will use mode option 2 and retrieve the synchronous code snippet of the JavaScript agent. 

**Note:**
The default url value will be used if mode is not included in the `dynatrace.config.js` file or if mode exists and the value is not valid (i.e. not a number 0 through 4).

### <a name="allowanycert"></a>Allow any certificate

If you are having an issue retrieving the JavaScript Agent and see an error message relating to a certificate:

```
Could not retrieve the JavaScript Agent! - Could not retrieve agent optionsError: unable to verify the first certificate
```

You are able to bypass those errors at your **OWN RISK** by using `allowanycert: true` within the `js` property. This will ignore the fact that the SSL connection is not secure (e.g. because of invalid certificate) and will retrieve the JavaScript Agent snippet anyways. An example would look like this:

```js
module.exports = {
    js : {
        url : `...`,
        allowanycert: true
    },
}
```

## <a name="usageJsAgent"></a>Manual instrumentation

The JavaScript Agent interface will be provided by the JavaScript Agent, it can be used everywhere in your application by simply calling `dtrum`.

This gives you the possibility to instrument your code even further by additional manual instrumentation. If you like to know more about the manual instrumentation have a look into the Dynatrace [documentation](#documentation). It is also possible to look into the definition file (`plugins/dynatrace-cordova-plugin/typings/main.d.ts`) to see the API documentation.

### <a name="manualAction"></a>Create manual action

To create a manual action that is called `"MyButton tapped"` you just need to use the following code below. The *leaveAction* will close the action again. It is possible to report values for this action before closing, see next section [Report Values](#reportValues).

```ts
"enterAction"(actionName: string, actionType: string, startTime?: number, sourceUrl?: string, sourceTitle?: string): number;

"leaveAction"(actionId: number, stopTime?: number, startTime?: number): void;
```

```js
var action = dtrum.enterAction('simple action', 'click', null, 'http://whatever.com');
//do something here
dtrum.leaveAction(action);
```

### <a name="reportValues"></a>Report error

For any open action you can report certain values. The following APIs are available on the Action:

```js
reportError(error: Error | string, parentActionId?: number): void;

dtrum.reportError('Error: Hello World with AJAX!');
```

### <a name="identifyUser"></a>Identify user

It is possible to identify a user and tag the current session with a name. You need to do the following call:

```js
dtrum.identifyUser("User XY");
```

### <a name="moreexamples"></a>More examples 

The above functionalities are only a small part of how you can use the API. If you want to know more you can visit the Settings in the WebUI. 

[![N|Solid](https://dt-cdn.net/images/settings-1103-17bfa1ae2f.png)]()

### <a name="typings"></a>Typings file for API

To use the interface of the JavaScript Agent directly you must specify the typing definition file in the *tsconfig.json*. Add the following block to the *tsconfig.json*: 

```
"files": ["plugins/dynatrace-cordova-plugin/typings/main.d.ts"] 
```

If "files" is already defined, just add the path to the already defined ones.

## <a name="usageMobileAgent"></a>Manual instrumentation - Mobile Agent

The Mobile Agent interface will be provided by the Mobile Agent, so it can be used everywhere in your application by simply calling `dynatraceMobile`.

### <a name="endvisit"></a>End session

In a hybrid scenario it is only possible for the mobile agent to end a session/visit. That's why we expose the endVisit function of the Mobile Agent. 

The interface is available with the name `dynatraceMobile` (TypeScript definitions included). Calling `dynatraceMobile.endVisit(successCallback, errorCallback)` will end the session/visit. Example how this call looks like:

```js
dynatraceMobile.endVisit(() => {
	// Success
	console.log("Visit was ended!");
}, () => {
	// Error
	console.log("Visit wasn't ended!");
});
```

### <a name="typings"></a>Typings file for API

To use the interface of the Mobile Agent directly you must specify the typing definition file in the *tsconfig.json*. Add the following block to the *tsconfig.json*: 

```
"files": ["plugins/dynatrace-cordova-plugin/typings/main.d.ts"] 
```

If "files" is already defined, just add the path to the already defined ones.

## <a name="ionicWebview"></a>Ionic Web View for Cordova

The Mobile agent usually sets cookies on the correct domain but the [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview) uses different domains. Those domains need to be added in the configuration. If you defined a custom [hostname](https://github.com/ionic-team/cordova-plugin-ionic-webview#hostname) you need to take this into account as well for choosing the correct domain. A sample configuration which takes care about the default domain for cordova-plugin-ionic-webview looks like the following:

```js
module.exports = {
    android : {
		config : `
		dynatrace{
			configurations {
				defaultConfig{
					autoStart{
						...
					}
					hybridWebView{
						enabled true
						domains 'http://localhost', '.other-domain-you-want-to-specify.com'
					}
				}
			}
		}
		`
    },

    ios : {
		config : `
		<DTXHybridApplication>true</DTXHybridApplication>
		<DTXSetCookiesForDomain>ionic://localhost,.other-domain-you-want-to-specify.com</DTXSetCookiesForDomain>
		`
    }  
}
```

## <a name="agentDebugLogs"></a>Native OneAgent debug logs

If your application starts but you see no data (or the session is not merged), you probably need to dig deeper to find out why the OneAgents aren't sending any data. Opening up a support ticket is a great idea, but gathering logs first is even better. 

### Android

Add the following configuration snippet to your other configuration in dynatrace.config.js right under the autoStart block (the whole structure is visible, so you know where the config belongs):

```js
android: {
  config: `
    dynatrace {
      configurations {
        defaultConfig {
          autoStart{
            ...
          }
          debug.agentLogging true
        }
      }
    }
  `
}
```

### iOS

Add the following configuration snippet to your other configuration in dynatrace.config.js (the whole structure is visible, so you know where the config belongs):

```js
ios: {
  config: `
  <key>DTXLogLevel</key>
  <string>ALL</string>
  `
}
```

## <a name="documentation"></a>Official documentation

  * Android Agent: https://www.dynatrace.com/support/help/technology-support/operating-systems/android/
  * iOS Agent: https://www.dynatrace.com/support/help/technology-support/operating-systems/ios/

## <a name="trouble"></a>Troubleshooting and current restrictions:

Basically if you have problems with the plugin please have a look into the logs. They will tell you what went wrong. The logs can be found in the plugins folder of your Cordova project. There is a directory called "Logs". 

* If you see a message like "Error: Could not retrieve the JSAgent! Error: self signed certificate in certificate chain" try to switch the JavaScript Agent configuration from HTTPS to HTTP.
* If you use live reload (e.g. ionic cordova run android -l) be aware that Ionic/Cordova doesn't use files from the platform folder, so the JavaScript Agent injection will not take place, as we only instrument the temporary platform folder. You are still able to add the copied JS Agent code snippet from the WebUI manually to your index.html (in the source directory). To get to this page, go to your **Web Application** settings and then select **Setup**. Auto-Instrumentation with the Mobile Agent still takes place.
* If you have problems retrieving the JavaScript Agent and you get error messages that the JavaScript Agent can not be retrieved, you probably don't have access to the API or there is a certificate issue. If this is the certificate use the [allowanycert feature](#allowanycert). In any other case a workaround is possible to use the cli and add the `--jsagent=` custom parameter and download the full Javascript Agent and add the path to the downloaded JS Agent file to the custom parameter value - With this the plugin will not retrieve the JS agent and will use the one that is specified.

## <a name="changelog"></a>Changelog

v1.0-OS
* Added hooks for the Outsystems wrapper

1.213.0
* Added new [custom parameter for cli](#customArguments) to allow use of local js agent script file
* Added [mode option](#mode) in the config file for using specific JSAgent code snippet
* No longer store JS Agent file and only inject platform html
* Added dtrum API that will prevent errors if JS agent is not loaded
* Updated iOS (8.209.1.1003) and Android Agent (8.211.1.1010)
* Skipping not readable files instead of throwing an exception

1.205.0
* Updated iOS and Android agent

1.201.0
* Updated iOS and Android agent

1.192.0
* Fix for Installation/Removing issues

1.191.2
* Android Instrumentation changed to Gradle
* New Mobile Agents (> 8.x)
