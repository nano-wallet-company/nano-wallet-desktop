import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule(
  'route:application', 'Unit | Route | application',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  () => {
    it('exists', function () {
      const route = this.subject();
      expect(route).to.be.ok;
    });
  },
);
