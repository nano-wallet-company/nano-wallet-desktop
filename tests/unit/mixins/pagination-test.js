import EmberObject from '@ember/object';
import PaginationMixin from 'raiwallet/mixins/pagination';
import { module, test } from 'qunit';

module('Unit | Mixin | pagination');

// Replace this with your real tests.
test('it works', (assert) => {
  const PaginationObject = EmberObject.extend(PaginationMixin);
  const subject = PaginationObject.create();
  assert.ok(subject);
});
