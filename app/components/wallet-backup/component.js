import Component from '@ember/component';
import { set } from '@ember/object';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import { reject } from 'rsvp';

import downloadjs from 'npm:downloadjs';

export default Component.extend({
  @service intl: null,
  @service flashMessages: null,

  wallet: null,
  seed: null,

  onCancel: null,
  onDone: null,

  needsConfirm: false,
  hasConfirmed: false,

  @action
  copySeed() {
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

    set(wallet, 'seed', seed);
    return wallet;
  },
});
