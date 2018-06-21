import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Helper | mnemonic', () => {
  setupRenderingTest();

  it('renders', async function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#mnemonic}}
    //     template content
    //   {{/mnemonic}}
    // `);
    this.set('seed', '74F2B37AAD20F4A260F0A5B3CB3D7FB51673212263E58A380BC10474BB039CEE');

    await render(hbs`{{mnemonic seed}}`);

    const expected = 'insane night team fog aunt eye long believe record fly garment health grunt mountain maze lake mechanic scare utility angry entry limb inhale stumble';
    expect(this.element.textContent.trim()).to.equal(expected);
  });
});
