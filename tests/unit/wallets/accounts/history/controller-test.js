import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule(
  'controller:wallets/accounts/history', 'Unit | Controller | wallets/accounts/history',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  () => {
    // Replace this with your real tests.
    it('exists', function () {
      const controller = this.subject();
      expect(controller).to.be.ok;
    });
  },
);
