#import "AppAPNs.h"
#import <UserNotifications/UserNotifications.h>
#import <UIKit/UIKit.h>

@implementation AppAPNs

RCT_EXPORT_MODULE();

/**
 * Requests authorization to display notifications for this App.
 * Resolves YES if permission granted, NO if denied.
 */
RCT_EXPORT_METHOD(requestNotificationPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  UNAuthorizationOptions options =
      UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;

  [center requestAuthorizationWithOptions:options
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (error) {
      reject(@"permission_error", error.localizedDescription, error);
      return;
    }

    if (granted) {
      dispatch_async(dispatch_get_main_queue(), ^{
        NSLog(@"✅ Notification permission granted. Registering for remote notifications…");
        [[UIApplication sharedApplication] registerForRemoteNotifications];
      });
      resolve(@(YES));
    } else {
      NSLog(@"⚠️ Notification permission denied by user.");
      resolve(@(NO));
    }
  }];
}

/**
 * Returns the stored APNs device token as a hex string.
 */
RCT_EXPORT_METHOD(getAPNSToken:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSData *deviceToken = [[NSUserDefaults standardUserDefaults] objectForKey:@"AppAPNSToken"];
  if (deviceToken) {
    const unsigned char *tokenBytes = (const unsigned char *)[deviceToken bytes];
    NSMutableString *hexToken = [NSMutableString stringWithCapacity:(deviceToken.length * 2)];
    for (NSUInteger i = 0; i < deviceToken.length; i++) {
      [hexToken appendFormat:@"%02x", tokenBytes[i]];
    }
    NSLog(@"📲 Returning stored APNs token: %@", hexToken);
    resolve(hexToken);
  } else {
    NSLog(@"⚠️ No APNs token found in NSUserDefaults. Ensure AppDelegate writes it.");
    reject(@"no_token", @"APNs token not yet available. Call requestNotificationPermission first.", nil);
  }
}

@end
