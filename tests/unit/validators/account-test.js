import { module, test } from 'qunit';
import validateAccount from 'raiwallet/validators/account';

module('Unit | Validator | account');

test('it exists', function(assert) {
  assert.ok(validateAccount());
});
