import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | wallets/overview/accounts/send', () => {
  setupTest('controller:wallets/overview/accounts/send', {
    // Specify the other units that are required for this test.
    needs: ['controller:wallets/overview'],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const controller = this.subject();
    expect(controller).to.be.ok;
  });
});
