import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateSeed from '@mikron.io/mikron-wallet/validators/seed';

describe('Unit | Validator | seed', () => {
  it('passes valid seed', () => {
    const validator = validateSeed();
    const seed = '34F0A37AAD20F4A260F0A5B3CB3D7FB50673212263E58A380BC10474BB039CE4';
    expect(validator('seed', seed)).to.be.true;
  });

  it('fails invalid seeds', () => {
    const validator = validateSeed();
    const values = [
      'Z4F0A37AAD20F4A260F0A5B3CB3D7FB50673212263E58A380BC10474BB039CE4',
      '34F0A37AAD20F4A260F0A5B3CB3D7FB50673212263E58A380BC10474BB039CE',
      '34F0A37AAD20F4A260F0A5B3CB3D7FB50673212263E58A380BC10474BB039CE44',
    ];

    values.forEach(v => expect(validator('seed', v)).to.not.be.true);
  });
});
