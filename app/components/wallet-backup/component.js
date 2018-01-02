import Component from '@ember/component';
import { reject } from 'rsvp';

import { action } from 'ember-decorators/object';

import downloadjs from 'npm:downloadjs';

export default Component.extend({
  wallet: null,
  seed: null,
  mnemonic: null,

  onCancel: null,
  onDone: null,

  needsConfirm: false,
  hasConfirmed: false,

  @action
  copySeed() {
    this.get('flashMessages').success('Seed copied to clipboard!');
  },

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic).split(' ').slice(0, 2).join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  },

  @action
  confirmDone() {
    const needsConfirm = this.get('needsConfirm');
    if (needsConfirm) {
      this.toggleProperty('hasConfirmed');
    }

    const hasConfirmed = this.get('hasConfirmed');
    if (!hasConfirmed) {
      this.toggleProperty('needsConfirm');
      return reject();
    }

    return true;
  },
});
