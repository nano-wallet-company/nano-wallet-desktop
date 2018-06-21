import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAmount from '@nano-wallet-company/nano-wallet-desktop/validators/amount';

describe('Unit | Validator | amount', () => {
  it('passes valid amounts', () => {
    const validator = validateAmount();
    const values = [
      '9',
      '9.',
      '.9',
      '9.9',
      '999',
    ];

    values.forEach(v => expect(validator('amount', v)).to.be.true);
  });

  it('fails invalid amounts', () => {
    const validator = validateAmount();
    const values = [
      '.',
      '9..',
      '..9',
      '9..9',
      '9e9',
    ];

    values.forEach(v => expect(validator('amount', v)).to.not.be.true);
  });
});
