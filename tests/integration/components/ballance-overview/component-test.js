import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ballance-overview', () => {
  setupComponentTest('ballance-overview', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#ballance-overview}}
    //     template content
    //   {{/ballance-overview}}
    // `);

    this.render(hbs`{{ballance-overview}}`);
    expect(this.$()).to.have.length(1);
  });
});
