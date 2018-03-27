import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | wallets/overview/accounts/settings', () => {
  setupTest('route:wallets/overview/accounts/settings', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:flashMessages',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
