import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet overview', () => {
  setupComponentTest('wallet-overview', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#wallet-overview}}
    //     template content
    //   {{/wallet-overview}}
    // `);

    const wallet = {
      id: '1',
      balance: '1000000000000000000000000000000',
      accounts: ['1'],
    };

    const accounts = [
      {
        id: '1',
        wallet: '1',
        balance: '1000000000000000000000000000000',
        pending: '0',
      },
    ];

    const page = 1;
    const perPage = 10;

    const createAccount = () => false;

    this.setProperties({
      wallet,
      accounts,
      page,
      perPage,
      createAccount,
    });

    this.render(hbs`{{wallet-overview wallet=wallet accounts=accounts page=page perPage=perPage createAccount=createAccount}}`);
    expect(this.$()).to.have.length(1);
  });
});
