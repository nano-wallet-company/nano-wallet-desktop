import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | wallet backup', () => {
  setupComponentTest('wallet-backup', {
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
    //   {{#wallet-backup}}
    //     template content
    //   {{/wallet-backup}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const seed = '74F2B37AAD20F4A260F0A5B3CB3D7FB51673212263E58A380BC10474BB039CEE';

    const onDone = () => false;
    const onCancel = () => false;

    this.setProperties({
      wallet,
      seed,
      onDone,
      onCancel,
    });

    this.render(hbs`{{wallet-backup wallet=wallet seed=seed onDone=onDone onCancel=onCancel}}`);
    expect(this.$()).to.have.length(1);
  });
});
