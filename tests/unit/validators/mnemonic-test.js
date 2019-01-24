import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateMnemonic from '@mikron.io/mikron-wallet/validators/mnemonic';

describe('Unit | Validator | mnemonic', () => {
  it('passes valid mnemonic', () => {
    const validator = validateMnemonic();
    const mnemonic = 'crunch lunar team fog aunt eye long believe record fly garment head grunt mountain maze lake mechanic scare utility angry entry limb inform neutral';
    expect(validator('mnemonic', mnemonic)).to.be.true;
  });

  it('fails invalid mnemonic', () => {
    const validator = validateMnemonic();
    expect(validator('mnemonic', 'crunch lunar')).to.not.be.true;
  });
});
