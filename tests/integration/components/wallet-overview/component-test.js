import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet overview', () => {
  setupComponentTest('wallet-overview', {
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
    //   {{#wallet-overview}}
    //     template content
    //   {{/wallet-overview}}
    // `);

    const store = this.container.lookup('service:store');
    const accounts = [
      store.createRecord('account', {
        id: '1',
        balance: '1000000000000000000000000000000',
        pending: '0',
      }),
    ];

    const wallet = store.createRecord('wallet', {
      accounts,
      id: '1',
      balance: '1000000000000000000000000000000',
    });

    const onChangeSlide = () => false;

    this.setProperties({
      wallet,
      accounts,
      onChangeSlide,
    });

    this.render(hbs`{{wallet-overview wallet=wallet accounts=accounts onChangeSlide=onChangeSlide}}`);
    expect(this.$()).to.have.length(1);
  });
});
