import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | navigation-bar', () => {
  setupComponentTest('navigation-bar', {
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
    //   {{#navigation-bar}}
    //     template content
    //   {{/navigation-bar}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const onCreateAccount = () => false;

    this.setProperties({ wallet, onCreateAccount });
    this.render(hbs`{{navigation-bar wallet=wallet onCreateAccount=onCreateAccount}}`);
    expect(this.$()).to.have.length(1);
  });
});
