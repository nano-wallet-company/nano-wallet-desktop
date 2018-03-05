import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-address', () => {
  setupComponentTest('account-address', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-address}}
    //     template content
    //   {{/account-address}}
    // `);

    this.render(hbs`{{account-address}}`);
    expect(this.$()).to.have.length(1);
  });
});
