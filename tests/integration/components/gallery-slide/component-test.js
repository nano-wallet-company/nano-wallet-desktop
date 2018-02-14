import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | gallery slide', () => {
  setupComponentTest('gallery-slide', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#gallery-slide}}
    //     template content
    //   {{/gallery-slide}}
    // `);

    this.render(hbs`{{gallery-slide}}`);
    expect(this.$()).to.have.length(1);
  });
});
