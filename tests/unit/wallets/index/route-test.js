import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | wallets/index', () => {
  setupTest('route:wallets/index', {
    // Specify the other units that are required for this test.
    needs: ['service:intl'],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
