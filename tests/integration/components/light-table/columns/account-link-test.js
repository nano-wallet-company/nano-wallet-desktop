import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Column } from 'ember-light-table';

moduleForComponent('light-table/columns/account-link', 'Integration | Component | Columns | account-link', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{light-table/columns/account-link}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders label', function(assert) {
  this.set('column', new Column({ label: 'account-link' }));

  this.render(hbs`{{light-table/columns/account-link column}}`);

  assert.equal(this.$().text().trim(), 'account-link');
});
