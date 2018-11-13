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

    const store = this.container.lookup('service:store');
    const wallet = store.createRecord('wallet', {
      id: '1',
      balance: '1000000000000000000000000000000',
    });

    const source = store.createRecord('account', {
      wallet,
      id: '1',
      balance: '1000000000000000000000000000000',
      pending: '0',
    });

    const accounts = [source];

    const block = store.createRecord('block', {
      wallet,
      source,
      id: '1',
    });

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
