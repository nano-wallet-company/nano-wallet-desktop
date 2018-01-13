import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateMnemonic from '@nanocurrency/nano-desktop/validators/amount';

describe('Unit | Validator | mnemonic', () => {
  // Replace this with your real tests.
  it('exists', () => {
    const result = validateMnemonic();
    expect(result).to.be.ok;
  });
});
