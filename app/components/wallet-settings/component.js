import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

import { computed, action, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import ChangeRepresentativeValidations from '../../validations/change-representative';


export default Component.extend({
  ChangeRepresentativeValidations,

  settings: storageFor('settings', 'wallet'),

  @readOnly
  @alias('settings.seed') seed: null,

  wallet: null,
  password: null,
  representative: null,

  onChangeRepresentative: null,
  onChangePassword: null,

  @computed
  get items() {
    return {
      revealSeed: null,
      changeRep: null,
      changePass: null,
    };
  },

  @action
  toggleItems(current) {
    const items = this.get('items');
    Object.keys(items).forEach((key) => {
      if (key === current) {
        this.toggleProperty(`items.${key}`);
      } else {
        this.set(`items.${key}`, null);
      }
    });
  },
});
