import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-card', () => {
  setupComponentTest('account-card', {
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
    //   {{#account-card}}
    //     template content
    //   {{/account-card}}
    // `);

    const store = this.container.lookup('service:store');
    const wallet = store.createRecord('wallet', {
      id: '1',
      balance: '1000000000000000000000000000000',
    });

    const account = store.createRecord('account', {
      wallet,
      id: '1',
      balance: '1000000000000000000000000000000',
      pending: '0',
    });

    this.set('account', account);
    this.render(hbs`{{account-card account=account}}`);
    expect(this.$()).to.have.length(1);
  });
});
