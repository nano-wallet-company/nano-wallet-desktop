import { expect } from 'chai';
import { describe, it } from 'mocha';
import getConversion from '@nanocurrency/tachyon/utils/get-conversion';

describe('Unit | Utility | get conversion', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = getConversion('Mxrb');
    expect(result).to.be.ok;
  });
});
