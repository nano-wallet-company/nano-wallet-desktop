import { expect } from 'chai';
import { describe, it } from 'mocha';
import generateSeed from '@nano-wallet-company/nano-wallet-desktop/utils/generate-seed';

describe('Unit | Utility | generate seed', () => {
  // Replace this with your real tests.
  it('works', () => {
    const result = generateSeed();
    expect(result).to.be.ok;
  });
});
