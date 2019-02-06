import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | setup', () => {
  setupTest('route:setup', {
    // Specify the other units that are required for this test.
    needs: [
      'service:settings',
      'service:intl',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
