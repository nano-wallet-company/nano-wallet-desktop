import ObjectProxy from '@ember/object/proxy';

import { alias } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class SettingsService extends ObjectProxy {
  @storageFor('settings') settings;

  @alias('settings') content;

  static isServiceFactory = true;

  willDestroy() {}
}
