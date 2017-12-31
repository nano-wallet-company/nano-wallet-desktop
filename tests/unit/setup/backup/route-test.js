import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule(
  'route:setup/backup', 'Unit | Route | setup/backup',
  {
    // Specify the other units that are required for this test.
    needs: ['service:flashMessages'],
  },
  () => {
    it('exists', function () {
      const route = this.subject();
      expect(route).to.be.ok;
    });
  },
);
