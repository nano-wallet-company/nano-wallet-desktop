import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | balance-overview', () => {
  setupComponentTest('balance-overview', {
    integration: true,
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

    this.render(hbs`{{balance-overview}}`);
    expect(this.$()).to.have.length(1);
  });
});
