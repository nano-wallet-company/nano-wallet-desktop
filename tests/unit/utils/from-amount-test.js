import { expect } from 'chai';
import { describe, it } from 'mocha';
import fromAmount from '@nanocurrency/nano-desktop/utils/from-amount';

describe('Unit | Utility | from amount', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = fromAmount('1000000000000000000000000000000');
    expect(result).to.be.ok;
  });
});
