import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Helper | to-nano-prefix', () => {
  setupRenderingTest();

  it('renders', async function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#mnemonic}}
    //     template content
    //   {{/mnemonic}}
    // `);
    this.set('xrbaddress', 'xrb_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3');

    await render(hbs`{{to-nano-prefix xrbaddress}}`);

    const expected = 'nano_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3';
    expect(this.element.textContent.trim()).to.equal(expected);
  });
});
