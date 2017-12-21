import { moduleForModel, test } from 'ember-qunit';

moduleForModel('wallet', 'Unit | Serializer | wallet', {
  // Specify the other units that are required for this test.
  needs: ['serializer:wallet', 'transform:big-number', 'model:account'],
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
