import { expect } from 'chai';
import { describe, it } from 'mocha';
import getExchangeRate from '@mikron.io/mikron-wallet/utils/get-exchange-rate';

describe('Unit | Utility | get-exchange-rate', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = getExchangeRate();
    expect(result).to.be.ok;
  });
});
