import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAccount from '@mikron.io/mikron-wallet/validators/account';

describe('Unit | Validator | account', () => {
  it('passes addresses with xrb_ prefix', () => {
    const validator = validateAccount();
    const account = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('passes addresses with mik_ prefix', () => {
    const validator = validateAccount();
    const account = 'mik_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('fails invalid addresses', () => {
    const validator = validateAccount();
    const values = [
      'miq_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'mik_4arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'mik_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsl',
      'mik_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsv',
      'mik_arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'mik_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps44',
    ];

    values.forEach(v => expect(validator('account', v)).to.not.be.true);
  });
});
