import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAccount from '@nanocurrency/nano-desktop/validators/account';

describe('Unit | Validator | account', () => {
  it('passes addresses with xrb_ prefix', () => {
    const validator = validateAccount();
    const account = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('passes addresses with nano_ prefix', () => {
    const validator = validateAccount();
    const account = 'nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('fails invalid addresses', () => {
    const validator = validateAccount();
    const values = [
      'xrp_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'xrb_4arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsl',
      'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsv',
      'xrb_arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps44',
    ];

    values.forEach(v => expect(validator('account', v)).to.not.be.true);
  });
});
