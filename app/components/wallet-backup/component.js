import Component from '@ember/component';
import { action } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { inject as service } from '@ember/service';

import { on } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

import { reject } from 'rsvp';

import downloadjs from 'downloadjs';

import { storageFor } from 'ember-local-storage';

@classNames('import')
class WalletBackupComponent extends Component {
  @service intl;

  @service flashMessages;

  @storageFor('settings', 'wallet') settings;

  wallet = null;

  seed = null;

  onCancel = null;

  onDone = null;

  needsConfirm = false;

  hasConfirmed = false;

  @on('willDestroyElement')
  clear() {
    this.set('seed', null);
  }

  @action
  copySeed() {
    const message = this.get('intl').t('wallets.backup.copied');
    this.get('flashMessages').success(message);
  }

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic)
      .split(' ')
      .slice(0, 2)
      .join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  }

  @action
  confirmDone(wallet) {
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
    tryInvoke(settings, 'setProperties', [{ createdAt }]);

    return wallet;
  }
}

export default WalletBackupComponent;
