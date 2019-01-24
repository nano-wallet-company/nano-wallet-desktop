import { expect } from 'chai';
import { describe, it } from 'mocha';
import validatePassword from '@mikron.io/mikron-wallet/validators/account';

describe('Unit | Validator | password', () => {
  // Replace this with your real tests.
  it('exists', () => {
    const result = validatePassword();
    expect(result).to.be.ok;
  });
});
