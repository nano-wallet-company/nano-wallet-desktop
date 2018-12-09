import { get } from '@ember/object';

import buildMessage from 'ember-changeset-validations/utils/validation-errors';

import unformatAmount from '../utils/unformat-amount';

export default function validateAmount() {
  return async (key, newValue, oldValue, changes, content) => {
    const intl = get(content, 'intl');
    const amount = unformatAmount(intl, newValue);
    if (amount.isNaN() || amount.isZero() || amount.isNegative()) {
      return buildMessage(key, { type: 'invalid' });
    }

    const block = await get(content, 'block');
    const source = await get(block, 'source');
    const balance = get(source, 'balance');
    if (amount.gt(balance)) {
      return intl.t('wallets.accounts.send.insufficient');
    }

    return true;
  };
}
