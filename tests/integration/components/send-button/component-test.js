import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | send-button', () => {
  setupComponentTest('send-button', {
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
    //   {{#send-button}}
    //     template content
    //   {{/send-button}}
    // `);

    const wallet = {
      id: '1',
      balance: '10000000000',
      accounts: ['1'],
    };

    const onOpen = () => false;
    const onClose = () => false;

    this.setProperties({ wallet, onOpen, onClose });
    this.render(hbs`{{send-button wallet=wallet onOpen=onOpen onClose=onClose}}`);
    expect(this.$()).to.have.length(1);
  });
});
