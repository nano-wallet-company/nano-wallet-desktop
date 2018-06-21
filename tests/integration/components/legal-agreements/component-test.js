import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | legal-agreements', () => {
  setupComponentTest('legal-agreements', {
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
    //   {{#legal-agreements}}
    //     template content
    //   {{/legal-agreements}}
    // `);

    const onAgree = () => false;
    const onDisagree = () => false;

    this.setProperties({ onAgree, onDisagree });
    this.render(hbs`{{legal-agreements onAgree=onAgree onDisagree=onDisagree}}`);
    expect(this.$()).to.have.length(1);
  });
});
