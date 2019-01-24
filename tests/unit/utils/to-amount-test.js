import { expect } from 'chai';
import { describe, it } from 'mocha';
import toAmount from '@mikron.io/mikron-wallet/utils/to-amount';

describe('Unit | Utility | to amount', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = toAmount('10000000000');
    expect(result).to.be.ok;
  });
});
