import { expect } from 'chai';
import { describe, it } from 'mocha';
import isElectron from 'cairn/utils/is-electron';

describe('Unit | Utility | is electron', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = isElectron();
    expect(result).to.be.ok;
  });
});
