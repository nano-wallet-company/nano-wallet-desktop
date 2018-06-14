import { find } from '@ember/test-helpers';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account-address', () => {
  setupComponentTest('account-address', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-address}}
    //     template content
    //   {{/account-address}}
    // `);

    this.render(hbs`{{account-address}}`);
    expect(this.$()).to.have.length(1);
  });

  it('displays the full address', function () {
    const value = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    this.set('value', value);
    this.render(hbs`{{account-address value=value}}`);

    const address = find('*').textContent.trim();
    expect(address).to.equal(value);
  });

  it('visually separates the first 9 and last 5 characters', function () {
    const value = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    this.set('value', value);
    this.render(hbs`{{account-address value=value}}`);

    const parts = this.$('span > span');
    expect(parts).to.have.length(3);

    const [head, body, tail] = parts.map((idx, el) => el.innerText.trim());
    expect(head).to.equal('xrb_3arg3');
    expect(body).to.equal('asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6q');
    expect(tail).to.equal('gjps4');
  });
});
