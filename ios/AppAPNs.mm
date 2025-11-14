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
 * Returns the stored APNs device token (hex string).
 */
RCT_EXPORT_METHOD(getAPNSToken:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *token = [[NSUserDefaults standardUserDefaults] stringForKey:@"AppAPNSToken"];
  if (token != nil && token.length > 0) {
    NSLog(@"📲 Returning stored APNs token: %@", token);
    resolve(token);
  } else {
    NSLog(@"⚠️ No APNs token found in NSUserDefaults. Ensure AppDelegate writes it.");
    reject(@"no_token", @"APNs token not yet available. Call requestNotificationPermission first.", nil);
  }
}

@end
