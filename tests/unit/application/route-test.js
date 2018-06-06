import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | application', () => {
  setupTest('route:application', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:config',
      'service:session',
      'service:settings',
      'service:electron',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
