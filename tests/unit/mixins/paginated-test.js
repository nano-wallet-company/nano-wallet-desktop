import EmberObject from '@ember/object';
import PaginatedMixin from 'raiwallet/mixins/paginated';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedObject = EmberObject.extend(PaginatedMixin);
  let subject = PaginatedObject.create();
  assert.ok(subject);
});
