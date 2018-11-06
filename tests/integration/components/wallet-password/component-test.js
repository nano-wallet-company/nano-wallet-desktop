import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet password', () => {
  setupComponentTest('wallet-password', {
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
    //   {{#wallet-password}}
    //     template content
    //   {{/wallet-password}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const onSubmit = () => false;

    this.setProperties({ wallet, onSubmit });
    this.render(hbs`{{wallet-password wallet=wallet onSubmit=(action onSubmit)}}`);
    expect(this.$()).to.have.length(1);
  });
});
