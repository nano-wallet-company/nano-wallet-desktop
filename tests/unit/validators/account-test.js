import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAccount from '@nanocurrency/nano-desktop/validators/account';

describe('Unit | Validator | account', () => {
  // Replace this with your real tests.
  it('exists', () => {
    const result = validateAccount();
    expect(result).to.be.ok;
  });
});
