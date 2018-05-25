import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | setup/password', () => {
  setupTest('route:setup/password', {
    // Specify the other units that are required for this test.
    needs: [
      'service:rpc',
      'service:session',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
