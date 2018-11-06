import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-settings', () => {
  setupComponentTest('account-settings', {
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
    //   {{#account-settings}}
    //     template content
    //   {{/account-settings}}
    // `);

    const store = this.container.lookup('service:store');
    const account = store.createRecord('account', {
      id: '1',
      wallet: '1',
      balance: '10000000000',
      pending: '0',
    });

    this.set('account', account);
    this.render(hbs`{{account-settings account=account}}`);
    expect(this.$()).to.have.length(1);
  });
});
