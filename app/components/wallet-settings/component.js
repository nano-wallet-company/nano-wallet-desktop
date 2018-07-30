import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

import { service } from 'ember-decorators/service';
import { readOnly, computed, action } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import { tryInvoke } from '@ember/utils';

import ChangeRepresentativeValidations from '../../validations/change-representative';
import { supportedFiatCurrencies, supportedCryptoCurrencies } from '../../utils/currencies';
import getExchangeRate from '../../utils/get-exchange-rate';

export default Component.extend({
  ChangeRepresentativeValidations,
  @service intl: null,

  settings: storageFor('settings', 'wallet'),

  @readOnly
  @alias('settings.seed') seed: null,

  @alias('settings.currencies') currencies: null,

  wallet: null,
  password: null,
  representative: null,

  onChangeRepresentative: null,
  onChangePassword: null,

  @computed
  get availableCurrency() {
    const fiat = supportedFiatCurrencies;
    const crypto = supportedCryptoCurrencies;

    const response = [
      { groupName: this.get('intl').t('fiat'), options: fiat },
      { groupName: this.get('intl').t('crypto'), options: crypto },
    ];

    return response;
  },

  @action
  async updateCurrencies(selection) {
    const settings = this.get('settings');
    const currencies = [];
    for (let i = 0; i < selection.length; i += 1) {
      const item = selection[i];
      /* eslint-disable-next-line */
      item.rate = await getExchangeRate(Symbol.for(selection[i].code));
      currencies.push(item);
    }

    /*
    *
    * Maybe is better to trigger the current updateExchangeRates task
    *
    */

    await tryInvoke(settings, 'setProperties', [{ currencies }]);
  },
});
