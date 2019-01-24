import { expect } from 'chai';
import { describe, it } from 'mocha';
import getPlatform from '@mikron.io/mikron-wallet/utils/get-platform';

describe('Unit | Utility | get platform', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = getPlatform();
    expect(result).to.be.ok;
  });
});
