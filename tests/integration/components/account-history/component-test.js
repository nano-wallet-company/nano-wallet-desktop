import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account history', () => {
  setupComponentTest('account-history', {
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
    //   {{#account-history}}
    //     template content
    //   {{/account-history}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const account = {
      id: '1',
      wallet: '1',
      balance: '10000000000',
      pending: '0',
    };

    const history = [
      {
        id: '1',
        type: 'receive',
        amount: '10000000000',
        source: '1',
        account: '2',
      },
    ];

    const page = 1;
    const perPage = 10;

    this.setProperties({
      wallet,
      account,
      history,
      page,
      perPage,
    });

    this.render(hbs`{{account-history wallet=wallet account=account history=history page=page perPage=perPage}}`);
    expect(this.$()).to.have.length(1);
  });
});
