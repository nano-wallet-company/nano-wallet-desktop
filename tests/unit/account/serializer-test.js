import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Serializer | account', () => {
  setupModelTest('account', {
    // Specify the other units that are required for this test.
    needs: [
      'model:wallet',
      'model:block',
      'model:history',
      'serializer:account',
      'transform:big-number',
      'transform:timestamp',
    ],
  });

  // Replace this with your real tests.
  it('serializes records', function () {
    const record = this.subject();

    const serializedRecord = record.serialize();

    expect(serializedRecord).to.be.ok;
  });
});
