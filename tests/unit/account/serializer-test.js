import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Serializer | account', () => {
  setupModelTest('account', {
    // Specify the other units that are required for this test.
    needs: [
      'serializer:account',
      'service:settings',
      'transform:big-number',
      'model:wallet',
      'model:block',
      'model:history',
    ],
  });

  // Replace this with your real tests.
  it('serializes records', function () {
    const record = this.subject();

    const serializedRecord = record.serialize();

    expect(serializedRecord).to.be.ok;
  });
});
