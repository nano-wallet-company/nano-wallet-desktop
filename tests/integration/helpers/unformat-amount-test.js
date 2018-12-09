import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('helper:unformat-amount', () => {
  setupRenderingTest({
    needs: ['service:intl'],
  });

  beforeEach(function () {
    const intl = this.owner.lookup('service:intl');
    intl.setLocale('en-us');
  });

  it('renders', async function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#unformat-amount}}
    //     template content
    //   {{/unformat-amount}}
    // `);

    this.set('inputValue', '0');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('0');
  });

  it('handles integer values', async function () {
    this.set('inputValue', '9');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('9');
  });

  it('handles decimal values', async function () {
    this.set('inputValue', '0.9');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('0.9');
  });

  it('handles integer values with empty decimal component', async function () {
    this.set('inputValue', '999.');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('999');
  });

  it('handles decimal values with empty integer component', async function () {
    this.set('inputValue', '.999');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('0.999');
  });

  it('handles values with both an integer and decimal component', async function () {
    this.set('inputValue', '999.999');
    await render(hbs`{{format-amount (unformat-amount inputValue)}}`);
    expect(find('*').textContent.trim()).to.equal('999.999');
  });

  it('handles different locale grouping', async function () {
    this.set('inputValue', '99 999,99');
    this.set('locale', 'fr-fr');
    await render(hbs`{{format-amount (unformat-amount inputValue locale=locale)}}`);
    expect(find('*').textContent.trim()).to.equal('99,999.99');

    this.set('inputValue', '9,9999.99');
    this.set('locale', 'zh-hans');
    await render(hbs`{{format-amount (unformat-amount inputValue locale=locale)}}`);
    expect(find('*').textContent.trim()).to.equal('99,999.99');
  });
});
