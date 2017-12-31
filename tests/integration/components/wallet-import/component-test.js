import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'wallet-import', 'Integration | Component | wallet import',
  {
    integration: true,
  },
  () => {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#wallet-import}}
      //     template content
      //   {{/wallet-import}}
      // `);

      const wallet = {
        id: '1',
        balance: '1000000000000000000000000000000',
        accounts: ['1'],
      };

      const onSubmit = () => false;

      this.setProperties({ wallet, onSubmit });
      this.render(hbs`{{wallet-import wallet=wallet onSubmit=onSubmit}}`);
      expect(this.$()).to.have.length(1);
    });
  },
);
