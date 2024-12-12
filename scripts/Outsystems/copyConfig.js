module.exports = function (context) {
    var deferral;
    var fs;
    var path;
    function isCordovaAbove (context, version) {
        var cordovaVersion = context.opts.cordova.version;
        console.log(cordovaVersion);
        var sp = cordovaVersion.split('.');
        return parseInt(sp[0]) >= version;
      }
    if(isCordovaAbove(context,8)){
        deferral = require("q").defer();
        fs  = require("fs");
        path  = require("path");
    }else{
        deferral = context.requireCordovaModule("q").defer();
        fs  = context.requireCordovaModule("fs");
        path  = context.requireCordovaModule("path");
    }

    var wwwPath = path.join(context.opts.projectRoot,"www");
    var configPath = path.join(wwwPath, "dynatraceConfig");
    files = fs.readdirSync(configPath);
    if(files.length >0){
        copyFolderRecursiveSync(configPath, path.join(context.opts.projectRoot));
        deferral.resolve();
    }else{
        console.log("Failed to handle plugin resources: " + configPath);
        deferral.resolve();
    }

    function copyFileSync(source, target){

        var targetFile = target; 

        if(fs.existsSync(target)){
            if(fs.lstatSync(target).isDirectory()){
                targetFile = path.join(target,path.basename(source));
            }
        }

        fs.writeFileSync(targetFile,fs.readFileSync(source));
    }

    function copyFolderRecursiveSync(source, target){
        var files = [];

        var targetFolder = path.join(target);
        if(!fs.existsSync(targetFolder)){
            fs.mkdirSync(targetFolder);
        }

        if(fs.lstatSync(source).isDirectory()){
            files = fs.readdirSync(source);
            files.forEach((file)=>{
                var curSource = path.join(source,file);
                if(fs.lstatSync(curSource).isDirectory()){
                    copyFolderRecursiveSync(curSource,targetFolder);
                }else{
                    copyFileSync(curSource,targetFolder);
                }
            });
        }
    }
    return deferral.promise;
};