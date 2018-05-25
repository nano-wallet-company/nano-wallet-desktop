import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | ajax', () => {
  setupTest('service:ajax', {
    // Specify the other units that are required for this test.
    needs: [
      'service:intl',
      'service:session',
      'service:hostManager',
      'service:electron',
    ],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const service = this.subject();
    expect(service).to.be.ok;
  });
});
