import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | download progress', () => {
  setupComponentTest('download-progress', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#download-progress}}
    //     template content
    //   {{/download-progress}}
    // `);

    this.render(hbs`{{download-progress}}`);
    expect(this.$()).to.have.length(1);
  });
});
