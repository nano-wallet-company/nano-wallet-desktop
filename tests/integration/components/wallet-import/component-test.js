import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet import', () => {
  setupComponentTest('wallet-import', {
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
    //   {{#wallet-import}}
    //     template content
    //   {{/wallet-import}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const onChange = () => false;
    const onSubmit = () => false;
    const onCancel = () => false;

    this.setProperties({
      wallet,
      onChange,
      onSubmit,
      onCancel,
    });

    this.render(hbs`{{wallet-import wallet=wallet onChange=onChange onSubmit=onSubmit onCancel=onCancel}}`);
    expect(this.$()).to.have.length(1);
  });
});
