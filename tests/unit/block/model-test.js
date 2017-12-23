import { moduleForModel, test } from 'ember-qunit';

moduleForModel('block', 'Unit | Model | block', {
  // Specify the other units that are required for this test.
  needs: ['transform:big-number'],
});

test('it exists', function (assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
