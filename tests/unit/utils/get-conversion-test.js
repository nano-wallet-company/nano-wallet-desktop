import { expect } from 'chai';
import { describe, it } from 'mocha';
import getConversion, { DEFAULT_UNIT } from '@mikron.io/mikron-wallet/utils/get-conversion';

describe('Unit | Utility | get conversion', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = getConversion(DEFAULT_UNIT);
    expect(result).to.be.ok;
  });
});
