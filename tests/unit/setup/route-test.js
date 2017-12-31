import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule(
  'route:setup', 'Unit | Route | setup',
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
