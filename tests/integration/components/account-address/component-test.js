import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { find, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-address', () => {
  setupRenderingTest();

  it('renders', async () => {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-address}}
    //     template content
    //   {{/account-address}}
    // `);

    await render(hbs`{{account-address}}`);
    expect(find('span')).to.exist;
  });

  it('displays the full address', async function() {
    const value = 'nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    this.set('value', value);
    await render(hbs`{{account-address value=value}}`);

    const address = this.element.textContent.trim();
    expect(address).to.equal(value);
  });

  it('visually separates the first 9 and last 5 characters', async function() {
    const value = 'nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    this.set('value', value);
    await render(hbs`{{account-address value=value}}`);

    const parts = findAll('span > span');
    expect(parts).to.have.length(3);

    const [head, body, tail] = parts.map(el => el.innerText.trim());
    expect(head).to.equal('nano_3arg3');
    expect(body).to.equal('asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6q');
    expect(tail).to.equal('gjps4');
  });

  it('converts xrb_ to nano_ addresses', async function() {
    const value = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    this.set('value', value);
    await render(hbs`{{account-address value=value}}`);

    const address = this.element.textContent.trim();
    expect(address).to.equal('nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4');
  });
});
