import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Serializer | frontier', () => {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('frontier');

    expect(serializer).to.be.ok;
  });

  it('serializes records', function() {
    const store = this.owner.lookup('service:store');
    const record = store.createRecord('frontier', {});

    const serializedRecord = record.serialize();

    expect(serializedRecord).to.be.ok;
  });
});
