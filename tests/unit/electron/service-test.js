import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | electron', () => {
  setupTest('service:electron', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:config',
    ],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const service = this.subject();
    expect(service).to.be.ok;
  });
});
