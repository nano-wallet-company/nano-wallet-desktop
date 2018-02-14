import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

import { reset } from 'ember-window-mock';

describe('Unit | Route | wallets/logout', () => {
  setupTest('route:wallets/logout', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  beforeEach(() => reset());

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
