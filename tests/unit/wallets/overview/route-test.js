import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | wallets/overview', () => {
  setupTest('route:wallets/overview', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:session',
      'service:flashMessages',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
