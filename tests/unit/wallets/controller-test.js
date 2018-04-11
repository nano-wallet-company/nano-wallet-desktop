import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | wallets', () => {
  setupTest('controller:wallets', {
    // Specify the other units that are required for this test.
    needs: [
      'service:flashMessages',
      'service:rpc',
    ],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const controller = this.subject();
    expect(controller).to.be.ok;
  });
});
