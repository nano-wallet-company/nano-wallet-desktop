import ObjectProxy from '@ember/object/proxy';

import { storage } from '../decorators';

export default class SettingsService extends ObjectProxy {
  @storage({ key: 'settings' }) content = null;

  static isServiceFactory = true;
}
