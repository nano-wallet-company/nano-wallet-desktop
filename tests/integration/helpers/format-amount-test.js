import { expect } from 'chai';

import { beforeEach, it, describe } from 'mocha';

import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('helper:format-amount', () => {
  setupComponentTest('format-amount', {
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
    //   {{#format-amount}}
    //     template content
    //   {{/format-amount}}
    // `);

    this.set('inputValue', '1100000000000000000000000000000');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('1.1');
  });
});
