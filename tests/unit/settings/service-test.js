import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | settings', () => {
  setupTest('service:settings', {
    // Specify the other units that are required for this test.
    needs: ['storage:settings'],
  });

  // Replace this with your real tests.
  it('exists', function() {
    const service = this.subject();
    expect(service).to.be.ok;
  });
});
