import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account history entry', () => {
  setupComponentTest('account-history-entry', {
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
    //   {{#account-history-entry}}
    //     template content
    //   {{/account-history-entry}}
    // `);

    const entry = {
      id: '1',
      type: 'receive',
      amount: '10000000000',
      source: '1',
      account: '2',
    };

    this.set('entry', entry);
    this.render(hbs`{{account-history-entry entry=entry}}`);
    expect(this.$()).to.have.length(1);
  });
});
