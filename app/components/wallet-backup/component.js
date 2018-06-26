import Component from '@ember/component';
import { tryInvoke } from '@ember/utils';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import { reject } from 'rsvp';

import { storageFor } from 'ember-local-storage';

import downloadjs from 'npm:downloadjs';

export default Component.extend({
  @service intl: null,
  @service flashMessages: null,

  settings: storageFor('settings', 'wallet'),

  classNames: ['import'],

  wallet: null,
  seed: null,

  onCancel: null,
  onDone: null,

  needsConfirm: false,
  hasConfirmed: false,

  @action
  copyMnemonic() {
    const message = this.get('intl').t('wallets.backup.copied');
    this.get('flashMessages').success(message);
  },

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic).split(' ').slice(0, 2).join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  },

  @action
  confirmDone(wallet, seed) {
    const needsConfirm = this.get('needsConfirm');
    if (needsConfirm) {
      this.toggleProperty('hasConfirmed');
    }

    const hasConfirmed = this.get('hasConfirmed');
    if (!hasConfirmed) {
      this.toggleProperty('needsConfirm');
      return reject();
    }

    const settings = this.get('settings');
    const createdAt = new Date().toISOString();
    tryInvoke(settings, 'setProperties', [{ seed, createdAt }]);

    this.set('seed', null);

    return wallet;
  },
});
