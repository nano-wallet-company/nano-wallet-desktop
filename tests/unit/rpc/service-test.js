import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | rpc', () => {
  setupTest('service:rpc', {
    // Specify the other units that are required for this test.
    needs: ['service:ajax'],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const service = this.subject();
    expect(service).to.be.ok;
  });
});
