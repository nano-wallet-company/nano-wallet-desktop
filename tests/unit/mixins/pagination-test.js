import { expect } from 'chai';
import { describe, it } from 'mocha';
import EmberObject from '@ember/object';
import PaginationMixin from '@nanocurrency/nano-desktop/mixins/pagination';

describe('Unit | Mixin | pagination', () => {
  // Replace this with your real tests.
  it('works', () => {
    const PaginationObject = EmberObject.extend(PaginationMixin);
    const subject = PaginationObject.create();
    expect(subject).to.be.ok;
  });
});
