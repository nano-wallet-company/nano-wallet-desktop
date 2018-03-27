import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-label', () => {
  setupComponentTest('account-label', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-label}}
    //     template content
    //   {{/account-label}}
    // `);

    this.render(hbs`{{account-label}}`);
    expect(this.$()).to.have.length(1);
  });
});
