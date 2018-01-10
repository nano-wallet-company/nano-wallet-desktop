import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAmount from 'tachyon/validators/amount';

describe('Unit | Validator | amount', () => {
  // Replace this with your real tests.
  it('exists', () => {
    const result = validateAmount();
    expect(result).to.be.ok;
  });
});
