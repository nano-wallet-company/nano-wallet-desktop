import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | balance-overview', () => {
  setupComponentTest('balance-overview', {
    integration: true,
  });

  beforeEach(function () {
    this.inject.service('intl');
    this.get('intl').setLocale('en-us');
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#balance-overview}}
    //     template content
    //   {{/balance-overview}}
    // `);

    const store = this.container.lookup('service:store');
    const wallet = store.createRecord('wallet', {
      id: '1',
      balance: '10000000000',
    });

    const onChangeCurrency = () => false;

    this.setProperties({ wallet, onChangeCurrency });
    this.render(hbs`{{balance-overview wallet=wallet onChangeCurrency=onChangeCurrency}}`);
    expect(this.$()).to.have.length(1);
  });
});
