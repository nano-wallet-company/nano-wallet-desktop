import { expect } from 'chai';
import { describe, it } from 'mocha';
import fromRaw from '@mikron.io/mikron-wallet/utils/from-raw';

describe('Unit | Utility | from raw', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = fromRaw('10000000000');
    expect(result).to.be.ok;
  });
});
