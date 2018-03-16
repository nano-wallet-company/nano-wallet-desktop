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

    this.set('inputValue', '0');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('0');
  });

  it('handles integer values with no decimal component', function () {
    this.set('inputValue', '1000000000000000000000000000000');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('1');
  });

  it('handles decimal values with no integer component', function () {
    this.set('inputValue', '100000000000000000000000000000');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('0.1');
  });

  it('handles values with both an integer and decimal component', function () {
    this.set('inputValue', '1100000000000000000000000000000');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('1.1');
  });

  it('handles large values with both an integer and decimal component', function () {
    this.set('inputValue', '1234012300000000000000000000000000');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('1,234.0123');
  });

  it('ignores decimal values beyond the 20th decimal place', function () {
    this.set('inputValue', '1100000000000000000000000000001');
    this.render(hbs`{{format-amount inputValue}}`);
    expect(this.$().text().trim()).to.equal('1.1');
  });

  it('converts the value according to the exchange rate', function () {
    this.set('inputValue', '1100000000000000000000000000000');
    this.render(hbs`{{format-amount inputValue exchangeRate=2}}`);
    expect(this.$().text().trim()).to.equal('2.2');
  });
});
