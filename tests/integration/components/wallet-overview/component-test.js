import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wallet-overview', 'Integration | Component | wallet overview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('wallet', {
    balance: '1000',
    pending: '0',
    accounts: [
      { id: 'xrb_19ttre8s3pbixnkii6pzhhx9ur9nwwhm89y39pnk71wocxopajsuwj1bgqkq', balance: '1000', pending: '0' },
      { id: 'xrb_1d69neepcu4mpop7yxqus14foqaqt57zr96ps6f1o94nsuhjdxpfs43aazdh', balance: '0',    pending: '0' }
    ]
  });

  this.render(hbs`{{wallet-overview wallet=wallet}}`);

  assert.ok(this.$().html().includes('xrb_'));
});
