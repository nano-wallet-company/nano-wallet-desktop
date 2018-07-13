import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | wallets/overview/accounts/send', () => {
  setupTest('route:wallets/overview/accounts/send', {
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
