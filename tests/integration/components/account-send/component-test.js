import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('account-send', 'Integration | Component | account send', {
  integration: true,
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('accounts', [
    { id: 'xrb_19ttre8s3pbixnkii6pzhhx9ur9nwwhm89y39pnk71wocxopajsuwj1bgqkq' },
    { id: 'xrb_1d69neepcu4mpop7yxqus14foqaqt57zr96ps6f1o94nsuhjdxpfs43aazdh' },
  ]);

  this.render(hbs`{{account-send accounts=accounts}}`);

  assert.ok(this.$().html().includes('xrb_'));
});
