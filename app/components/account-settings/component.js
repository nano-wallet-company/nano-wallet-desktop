import Component from '@ember/component';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { action } from '@ember-decorators/object';
import { gt } from '@ember-decorators/object/computed';
import { argument } from '@ember-decorators/argument';
import { service } from '@ember-decorators/service';

import { storage } from '../../decorators';

import ChangeAccountSettingsValidations from '../../validations/change-account-settings';

import fromAmount from '../../utils/from-amount';

export default class AccountSettingsComponent extends Component {
  @service intl = null;

  @storage('account') settings = null;

  ChangeAccountSettingsValidations = ChangeAccountSettingsValidations;

  @argument account = null;

  @argument onSave = null;

  @argument onCancel = null;

  @gt('account.blockCount', 0) hasOpenBlock = false;

  @action
  async remove(account) {
    const balance = get(account, 'balance');
    if (fromAmount(balance).gt(0)) {
      const message = this.get('intl').t('wallets.accounts.cannotDelete');
      this.get('flashMessages').danger(message, { sticky: true });
      return false;
    }

    await account.destroyRecord();
    return false;
  }

  @action
  async save(changeset, account) {
    const publicLabel = get(changeset, 'publicLabel');
    const publicLabelOld = get(account, 'comment');
    const privateLabel = get(changeset, 'privateLabel');
    const representative = get(changeset, 'representative');
    const representativeOld = get(account, 'representative');

    let error = null;
    if (privateLabel) {
      const settings = this.get('settings');
      tryInvoke(settings, 'setProperties', [{ label: privateLabel }]);
    }

    if (publicLabel && publicLabel !== publicLabelOld) {
      set(account, 'comment', publicLabel);
      try {
        await account.save();
      } catch (err) {
        error = err;
        // revert
        set(account, 'comment', publicLabelOld);
      }
    }

    if (representative && representative !== representativeOld) {
      set(account, 'representative', representative);
      try {
        await account.save();
      } catch (err) {
        error = err;
        // revert
        set(account, 'representative', representativeOld);
      }
    }

    if (error) {
      const message = this.get('intl').t('accountSettingsSaveError');
      this.get('flashMessages').success(`${message} -- ${error}`);
      return false;
    }

    const message = this.get('intl').t('accountSettingsSaved');
    this.get('flashMessages').success(message);

    return false;
  }
}
