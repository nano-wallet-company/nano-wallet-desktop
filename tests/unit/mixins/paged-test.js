import EmberObject from '@ember/object';
import PagedMixin from 'raiwallet/mixins/paged';
import { module, test } from 'qunit';

module('Unit | Mixin | paged');

// Replace this with your real tests.
test('it works', (assert) => {
  const PagedObject = EmberObject.extend(PagedMixin);
  const subject = PagedObject.create();
  assert.ok(subject);
});
