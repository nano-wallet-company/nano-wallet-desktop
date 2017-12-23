import EmberObject from '@ember/object';
import PagedMixin from 'raiwallet/mixins/paged';
import { module, test } from 'qunit';

module('Unit | Mixin | paged');

// Replace this with your real tests.
test('it works', function(assert) {
  let PagedObject = EmberObject.extend(PagedMixin);
  let subject = PagedObject.create();
  assert.ok(subject);
});
