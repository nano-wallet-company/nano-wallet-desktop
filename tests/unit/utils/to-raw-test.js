import { expect } from 'chai';
import { describe, it } from 'mocha';
import toRaw from '@mikron.io/mikron-wallet/utils/to-raw';

describe('Unit | Utility | to raw', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = toRaw('10000000000');
    expect(result).to.be.ok;
  });
});
