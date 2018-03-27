import Component from '@ember/component';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { storageFor } from 'ember-local-storage';

import { action } from 'ember-decorators/object';

import ChangeAccountSettingsValidations from '../../validations/change-account-settings';

export default Component.extend({
  ChangeAccountSettingsValidations,

  settings: storageFor('settings', 'account'),

  account: null,
  onSave: null,
  onCancel: null,

  @action
  save(changeset) {
    const settings = this.get('settings');
    const label = get(changeset, 'label');
    tryInvoke(settings, 'setProperties', [{ label }]);
  },
});
