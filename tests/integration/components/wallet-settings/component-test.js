import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet settings', () => {
  setupComponentTest('wallet-settings', {
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
    //   {{#wallet-settings}}
    //     template content
    //   {{/wallet-settings}}
    // `);

    const store = this.container.lookup('service:store');
    const wallet = store.createRecord('wallet', {
      id: '1',
      balance: '10000000000',
    });

    const onChangePassword = () => false;
    const onChangeRepresentative = () => false;

    this.setProperties({ wallet, onChangePassword, onChangeRepresentative });
    this.render(hbs`{{wallet-settings wallet=wallet onChangeRepresentative=onChangeRepresentative onChangePassword=onChangePassword}}`);
    expect(this.$()).to.have.length(1);
  });
});
