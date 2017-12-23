import { moduleForModel, test } from 'ember-qunit';

moduleForModel('account', 'Unit | Serializer | account', {
  // Specify the other units that are required for this test.
  needs: ['serializer:account', 'transform:big-number', 'model:wallet', 'model:block'],
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  const record = this.subject();

  const serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
