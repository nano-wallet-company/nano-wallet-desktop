import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | notification-center', () => {
  setupComponentTest('notification-center', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#notification-center}}
    //     template content
    //   {{/notification-center}}
    // `);

    this.render(hbs`{{notification-center}}`);
    expect(this.$()).to.have.length(1);
  });
});
