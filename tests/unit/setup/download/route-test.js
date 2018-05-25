import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | setup/download', () => {
  setupTest('route:setup/download', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:electron',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
