import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account overview', () => {
  setupComponentTest('account-overview', {
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
    //   {{#account-overview}}
    //     template content
    //   {{/account-overview}}
    // `);

    const account = {
      id: '1',
      wallet: '1',
      balance: '10000000000',
      pending: '0',
    };

    const onDelete = () => false;

    this.setProperties({ account, onDelete });
    this.render(hbs`{{account-overview account=account onDelete=(action onDelete)}}`);
    expect(this.$()).to.have.length(1);
  });
});
