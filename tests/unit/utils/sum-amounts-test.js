import { expect } from 'chai';
import { describe, it } from 'mocha';
import sumAmounts from '@mikron.io/mikron-wallet/utils/sum-amounts';

describe('Unit | Utility | sum-amounts', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = sumAmounts([1, 2]);
    expect(result).to.be.ok;
    expect(result.toFixed(0)).to.equal('3');
  });
});
