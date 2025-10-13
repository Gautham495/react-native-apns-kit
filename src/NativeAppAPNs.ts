import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  requestNotificationPermission(): Promise<boolean>;
  getAPNSToken(): Promise<string>;
}

const AppAPNs = TurboModuleRegistry.getEnforcing<Spec>('AppAPNs');

export default AppAPNs;
