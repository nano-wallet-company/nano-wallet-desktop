import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | download progress', () => {
  setupComponentTest('download-progress', {
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
    //   {{#download-progress}}
    //     template content
    //   {{/download-progress}}
    // `);

    const downloader = {
      on() {},
      off() {},
    };

    const asset = 'node';
    const onDone = () => false;

    this.setProperties({ downloader, asset, onDone });
    this.render(hbs`{{download-progress downloader=downloader asset=asset onDone=onDone}}`);
    expect(this.$()).to.have.length(1);
  });
});
