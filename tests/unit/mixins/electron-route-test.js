import { expect } from 'chai';
import { describe, it } from 'mocha';
import EmberObject from '@ember/object';
import ElectronRouteMixin from '@nanocurrency/nano-desktop/mixins/electron-route';

describe('Unit | Mixin | node route', () => {
  // Replace this with your real tests.
  it('works', () => {
    const ElectronRouteObject = EmberObject.extend(ElectronRouteMixin);
    const subject = ElectronRouteObject.create();
    expect(subject).to.be.ok;
  });
});
