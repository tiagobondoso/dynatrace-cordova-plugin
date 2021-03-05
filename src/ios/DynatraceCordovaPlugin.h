#import <Cordova/CDVPlugin.h>

@interface DynatraceCordovaPlugin : CDVPlugin

- (void)endVisit:(CDVInvokedUrlCommand*)command;
- (void)startVisit:(CDVInvokedUrlCommand*)command;

@end