import Component from '@ember/component';
import { tryInvoke } from '@ember/utils';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

import { reject } from 'rsvp';

import downloadjs from 'npm:downloadjs';

import { storage } from '../../decorators';

@classNames('import')
class WalletBackupComponent extends Component {
  @service intl = null;

  @service flashMessages = null;

  @storage('wallet') settings = null;

  @argument wallet = null;

  @argument seed = null;

  @argument onCancel = null;

  @argument onDone = null;

  needsConfirm = false;

  hasConfirmed = false;

  @action
  copySeed() {
    const message = this.get('intl').t('wallets.backup.copied');
    this.get('flashMessages').success(message);
  }

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic).split(' ').slice(0, 2).join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  }

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
  }
}

export default WalletBackupComponent;
