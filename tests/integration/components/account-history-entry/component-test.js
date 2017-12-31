import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account history entry', () => {
  setupComponentTest('account-history-entry', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-history-entry}}
    //     template content
    //   {{/account-history-entry}}
    // `);

    const row = {
      content: {
        type: 'receive',
      },
    };

    this.set('row', row);
    this.render(hbs`{{account-history-entry row=row}}`);
    expect(this.$()).to.have.length(1);
  });
});
