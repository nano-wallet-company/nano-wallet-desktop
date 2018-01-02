import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account send', () => {
  setupComponentTest('account-send', {
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
    //   {{#account-send}}
    //     template content
    //   {{/account-send}}
    // `);

    const accounts = [
      {
        id: '1',
        wallet: '1',
        balance: '1000000000000000000000000000000',
        pending: '0',
      },
    ];

    const block = {
      id: '1',
      wallet: '1',
      source: '1',
      destination: '2',
      amount: '1000000000000000000000000000000',
    };

    const onChange = () => false;
    const onSubmit = () => false;

    this.setProperties({
      accounts,
      block,
      onChange,
      onSubmit,
    });

    this.render(hbs`{{account-send accounts=accounts block=block onChange=onChange onSubmit=onSubmit}}`);
    expect(this.$()).to.have.length(1);
  });
});
