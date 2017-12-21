
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-amount', 'helper:format-amount', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234000000000000000000000000000000');

  this.render(hbs`{{format-amount inputValue}}`);

  assert.equal(this.$().text().trim(), '1,234');
});

