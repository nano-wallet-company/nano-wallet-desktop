import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | total amount', () => {
  setupComponentTest('total-amount', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#total-amount}}
    //     template content
    //   {{/total-amount}}
    // `);

    this.render(hbs`{{total-amount}}`);
    expect(this.$()).to.have.length(1);
  });
});
