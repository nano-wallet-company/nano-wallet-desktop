import { moduleFor, test } from 'ember-qunit';

moduleFor('service:rpc', 'Unit | Service | rpc', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  needs: ['service:ajax'],
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const service = this.subject();
  assert.ok(service);
});
