import AppAPNs from './NativeAppAPNs';

/**
 * Requests permission from the user to receive App notifications.
 * Returns `true` if granted, `false` otherwise.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  return await AppAPNs.requestNotificationPermission();
}

/**
 * Retrieves the temporary APNs token for this App session.
 * You can send this token to your backend to push notifications to the user.
 */
export async function getAPNSToken(): Promise<string> {
  return await AppAPNs.getAPNSToken();
}

// Default export for convenience
export default {
  requestNotificationPermission,
  getAPNSToken,
};
