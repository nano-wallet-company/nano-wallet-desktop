import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Serializer | wallet', () => {
  setupModelTest('wallet', {
    // Specify the other units that are required for this test.
    needs: [
      'model:account',
      'serializer:wallet',
      'transform:big-number',
      'model:account',
    ],
  });

  // Replace this with your real tests.
  it('serializes records', function () {
    const record = this.subject();

    const serializedRecord = record.serialize();

    expect(serializedRecord).to.be.ok;
  });
});
