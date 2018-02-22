import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | setup/import', () => {
  setupTest('route:setup/import', {
    // Specify the other units that are required for this test.
    needs: ['service:rpc'],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
