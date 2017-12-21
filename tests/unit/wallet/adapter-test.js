import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:wallet', 'Unit | Adapter | wallet', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['service:rpc'],
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
