import { expect } from 'chai';
import { beforeEach, it, describe } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('helper:format-amount', () => {
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
    //   {{#format-amount}}
    //     template content
    //   {{/format-amount}}
    // `);

    this.set('inputValue', '0');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('0');
  });

  it('handles integer values with no decimal component', async function () {
    this.set('inputValue', '10000000000');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('1');
  });

  it('handles decimal values with no integer component', async function () {
    this.set('inputValue', '1000000000');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('0.1');
  });

  it('handles values with both an integer and decimal component', async function () {
    this.set('inputValue', '11000000000');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('1.1');
  });

  it('handles large values with both an integer and decimal component', async function () {
    this.set('inputValue', '12340123000000');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('1,234.0123');
  });

  it('handle decimal values at the 10th decimal place', async function () {
    this.set('inputValue', '11000000001');
    await render(hbs`{{format-amount inputValue}}`);
    expect(find('*').textContent.trim()).to.equal('1.1000000001');
  });

  it('converts the value according to the exchange rate', async function () {
    this.set('inputValue', '11000000000');
    await render(hbs`{{format-amount inputValue exchangeRate=2}}`);
    expect(find('*').textContent.trim()).to.equal('2.2');
  });
});
