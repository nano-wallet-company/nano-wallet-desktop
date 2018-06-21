import { expect } from 'chai';
import { describe, it } from 'mocha';
import toAmount from '@nano-wallet-company/nano-wallet-desktop/utils/to-amount';

describe('Unit | Utility | to amount', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = toAmount('1000000000000000000000000000000');
    expect(result).to.be.ok;
  });
});
