import { module, test } from 'qunit';
import validateSeed from 'cairn/validators/seed';

module('Unit | Validator | seed');

test('it exists', (assert) => {
  assert.ok(validateSeed());
});
