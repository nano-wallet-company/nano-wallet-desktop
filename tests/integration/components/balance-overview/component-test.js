import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | balance-overview', () => {
  setupComponentTest('balance-overview', {
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
    //   {{#balance-overview}}
    //     template content
    //   {{/balance-overview}}
    // `);

    const wallet = {
      id: '1',
      balance: '1000000000000000000000000000000',
      accounts: ['1'],
    };

    this.set('wallet', wallet);
    this.render(hbs`{{balance-overview wallet=wallet}}`);
    expect(this.$()).to.have.length(1);
  });
});
