import { expect } from 'chai';
import { describe, it } from 'mocha';
import fromAmount from '@mikron.io/mikron-wallet/utils/from-amount';

describe('Unit | Utility | from amount', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = fromAmount('10000000000');
    expect(result).to.be.ok;
  });
});
