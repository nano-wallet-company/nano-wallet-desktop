import ObjectProxy from '@ember/object/proxy';

import { alias } from '@ember-decorators/object/computed';

import { storage } from '../decorators';

export default class SettingsService extends ObjectProxy {
  @storage() settings = null;

  @alias('settings') content = null;

  static isServiceFactory = true;
}
