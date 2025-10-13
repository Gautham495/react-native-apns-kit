package com.gautham.appapns

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AppAPNsModule.NAME)
class AppAPNsModule(reactContext: ReactApplicationContext) :
   NativeModule, TurboModule {

  companion object {
    const val NAME = "AppAPNs"
  }

  override fun getName(): String = NAME

  @ReactMethod
  override fun requestNotificationPermission(promise: Promise) {
    promise.reject("not_supported", "This library's notifications methods are only supported on iOS.")
  }

  @ReactMethod
  override fun getAPNSToken(promise: Promise) {
    promise.reject("not_supported", "This library's notifications methods are only supported on iOS.")
  }
}
