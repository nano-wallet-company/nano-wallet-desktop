import EmberObject from '@ember/object';
import PaginatedMixin from 'raiwallet/mixins/paginated';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated');

// Replace this with your real tests.
test('it works', (assert) => {
  const PaginatedObject = EmberObject.extend(PaginatedMixin);
  const subject = PaginatedObject.create();
  assert.ok(subject);
});
