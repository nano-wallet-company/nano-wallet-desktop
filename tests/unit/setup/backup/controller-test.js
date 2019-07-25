import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | setup/backup', () => {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    const controller = this.owner.lookup('controller:setup/backup');
    expect(controller).to.be.ok;
  });
});
