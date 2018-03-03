import { expect } from 'chai';
import { describe, it } from 'mocha';
import getTimestamp from '@nanocurrency/nano-desktop/utils/get-timestamp';

describe('Unit | Utility | get-timestamp', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = getTimestamp();
    expect(result).to.be.ok;
  });
});
