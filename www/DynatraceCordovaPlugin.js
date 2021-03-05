var exec = require('cordova/exec');
var emptyFunction = function () { };

module.exports = {

	endVisit: function (success, error) {
		success = success || emptyFunction;
		error = error || emptyFunction;

		exec(success, error, "DynatraceCordovaPlugin", "endVisit", []);
	},
	startVisit: function (appId,beaconUrl,success, error) {
		success = success || emptyFunction;
		error = error || emptyFunction;

		exec(success, error, "DynatraceCordovaPlugin", "startVisit", [appId,beaconUrl]);
	}


}