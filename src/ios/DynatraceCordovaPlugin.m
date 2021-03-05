#import "DynatraceCordovaPlugin.h"
#import <Cordova/CDVPlugin.h>
#import "Dynatrace.h"


@implementation DynatraceCordovaPlugin

- (void)endVisit:(CDVInvokedUrlCommand*)command{
    DTX_StatusCode code = [Dynatrace endVisit];
    
    CDVPluginResult* result;

    if(code == DTX_CaptureOff){
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                    messageAsString:@(code).stringValue];
    }else{
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                    messageAsString:@(code).stringValue];
    }
                              
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)startDynatrace:(CDVInvokedUrlCommand*)command{
    NSMutableDictionary<NSString*,id> *config = [NSMutableDictionary alloc];
    NSString* appId = command.arguments[0];
    NSString* beaconUrl = command.arguments[1];
    [config setValue:appId forKey:@"DTXApplicationID"];
    [config setValue:beaconUrl forKey:@"DTXBeaconURL"];
    [config setValue:@"true" forKey:@"DTXHybridApplication"];
    [config setValue:@"true" forKey:@"DTXStartupLoadBalancing"];
    DTX_StatusCode code = [Dynatrace startupWithConfig:config];
    CDVPluginResult* result;

    if(code == DTX_CaptureOn){
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                    messageAsString:@(code).stringValue];
    }else{
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                    messageAsString:@(code).stringValue];
    }
                              
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
