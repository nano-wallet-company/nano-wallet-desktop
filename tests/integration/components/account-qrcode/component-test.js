import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-qrcode', () => {
  setupComponentTest('account-qrcode', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-qrcode}}
    //     template content
    //   {{/account-qrcode}}
    // `);

    this.render(hbs`{{account-qrcode}}`);
    expect(this.$()).to.have.length(1);
  });
});
