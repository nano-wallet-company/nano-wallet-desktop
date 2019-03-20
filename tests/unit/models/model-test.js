import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Model | frontier', () => {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('frontier', {});
    expect(model).to.be.ok;
  });
});
