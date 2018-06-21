import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | setup/legal', () => {
  setupTest('route:setup/legal', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:settings',
    ],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
