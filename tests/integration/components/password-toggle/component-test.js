import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | password-toggle', () => {
  setupComponentTest('password-toggle', {
    integration: true,
  });

  beforeEach(function () {
    this.inject.service('intl');
    this.get('intl').setLocale('en-us');
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#password-toggle}}
    //     template content
    //   {{/password-toggle}}
    // `);

    this.render(hbs`{{password-toggle}}`);
    expect(this.$()).to.have.length(1);
  });
});
