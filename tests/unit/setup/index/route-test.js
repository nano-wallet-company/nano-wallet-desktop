import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule(
  'route:setup/index', 'Unit | Route | setup/index',
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
