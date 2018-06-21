import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | external-link', () => {
  setupComponentTest('external-link', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#external-link}}
    //     template content
    //   {{/external-link}}
    // `);

    this.render(hbs`{{external-link}}`);
    expect(this.$()).to.have.length(1);
  });
});
