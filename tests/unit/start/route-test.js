import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | start', () => {
  setupTest('route:start', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:session',
      'service:electron',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
