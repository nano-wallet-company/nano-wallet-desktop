import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account amount', () => {
  setupComponentTest('account-amount', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-amount}}
    //     template content
    //   {{/account-amount}}
    // `);

    const value = '1000000000000000000000000000000';
    this.set('value', value);
    this.render(hbs`{{account-amount value=value}}`);
    expect(this.$()).to.have.length(1);
  });
});
