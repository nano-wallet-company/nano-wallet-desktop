import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account link', () => {
  setupComponentTest('account-link', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-link}}
    //     template content
    //   {{/account-link}}
    // `);

    const value = '1';
    this.set('value', value);
    this.render(hbs`{{account-link value=value}}`);
    expect(this.$()).to.have.length(1);
  });
});
