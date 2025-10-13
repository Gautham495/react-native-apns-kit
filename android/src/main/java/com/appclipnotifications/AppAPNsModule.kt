package com.appapns

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AppAPNsModule.NAME)
class AppAPNsModule(reactContext: ReactApplicationContext) :
  NativeappapnsSpec(reactContext) {

  override fun getName(): String = NAME

  /**
   * Request permission to show notifications (iOS only)
   */
  @ReactMethod
  override fun requestNotificationPermission(promise: Promise) {
    promise.reject("not_supported", "This library's notifications methods are only supported on iOS.")
  }

  /**
   * Retrieve the temporary APNs token (iOS only)
   */
  @ReactMethod
  override fun getAPNSToken(promise: Promise) {
    promise.reject("not_supported", "This library's notifications methods are only supported on iOS.")
  }

  companion object {
    const val NAME = "appapns"
  }
}
