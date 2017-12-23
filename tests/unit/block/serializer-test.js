import { moduleForModel, test } from 'ember-qunit';

moduleForModel('block', 'Unit | Serializer | block', {
  // Specify the other units that are required for this test.
  needs: ['serializer:block', 'transform:big-number', 'model:wallet', 'model:account'],
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  const record = this.subject();

  const serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
