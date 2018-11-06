import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-carousel', () => {
  setupComponentTest('account-carousel', {
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
    //   {{#account-carousel}}
    //     template content
    //   {{/account-carousel}}
    // `);

    const store = this.container.lookup('service:store');
    const accounts = [
      store.createRecord('account', {
        id: '1',
        wallet: '1',
        balance: '10000000000',
        pending: '0',
      }),
    ];

    this.set('accounts', accounts);
    this.render(hbs`{{account-carousel accounts=accounts}}`);
    expect(this.$()).to.have.length(1);
  });
});
