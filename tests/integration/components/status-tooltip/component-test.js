import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | status tooltip', () => {
  setupComponentTest('status-tooltip', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#status-tooltip}}
    //     template content
    //   {{/status-tooltip}}
    // `);

    this.render(hbs`{{status-tooltip}}`);
    expect(this.$()).to.have.length(1);
  });
});
