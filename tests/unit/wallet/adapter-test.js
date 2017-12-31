import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Adapter | wallet', () => {
  setupTest('adapter:wallet', {
    // Specify the other units that are required for this test.
    needs: ['service:rpc'],
  });

  // Replace this with your real tests.
  it('exists', function () {
    const adapter = this.subject();
    expect(adapter).to.be.ok;
  });
});
