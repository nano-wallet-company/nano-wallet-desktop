import { expect } from 'chai';
import { describe, it } from 'mocha';

import toAmount from '@mikron.io/mikron-wallet/utils/to-amount';
import validateAmount from '@mikron.io/mikron-wallet/validators/amount';

describe('Unit | Validator | amount', () => {
  const intl = {
    locale: ['en-us'],

    t() {
      return 'invalid';
    },

    formatNumber() {
      return '9.9';
    },
  };

  const source = { balance: toAmount('999') };
  const content = { intl, block: { source } };

  it('exists', () => {
    const result = validateAmount();
    expect(result).to.be.ok;
  });

  it('passes valid amounts', async () => {
    const amount = '1.0';
    const validator = validateAmount();
    const result = await validator('amount', amount, null, { amount }, content);
    expect(result).to.be.true;
  });

  it('fails for invalid amounts', async () => {
    const validator = validateAmount();
    const amount = 'foo';
    const result = await validator('amount', amount, null, { amount }, content);
    expect(result).to.not.be.true;
  });

  it('fails for zero amounts', async () => {
    const validator = validateAmount();
    const amount = '0';
    const result = await validator('amount', amount, null, { amount }, content);
    expect(result).to.not.be.true;
  });

  it('fails for insufficient balances', async () => {
    const amount = '9999';
    const validator = validateAmount();
    const result = await validator('amount', amount, null, { amount }, content);
    expect(result).to.not.be.true;
  });
});
