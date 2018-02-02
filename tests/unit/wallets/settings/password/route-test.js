import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | wallets/settings/password', () => {
  setupTest('route:wallets/settings/password', {
    // Specify the other units that are required for this test.
    needs: ['service:rpc', 'service:intl', 'service:session'],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
