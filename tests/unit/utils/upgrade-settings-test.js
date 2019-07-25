import { expect } from 'chai';
import { describe, it } from 'mocha';

import window, { reset } from 'ember-window-mock';

import upgradeSettings from '@nano-wallet-company/nano-wallet-desktop/utils/upgrade-settings';

const { localStorage } = window;

describe('Unit | Utility | upgrade-settings', () => {
  beforeEach(() => reset());

  it('upgrades from v0 to v1', async () => {
    const settings = await upgradeSettings({ version: 0 });
    expect(settings).to.be.an('object');
    expect(settings.version).to.equal(1);
  });

  it('overwrites localStorage with upgraded settings', async () => {
    localStorage.setItem(
      'wallet',
      JSON.stringify({
        key: 'somevalue',
        seed: 'someseed',
        subkey: {
          seed: 'someseed',
        },
      }),
    );

    await upgradeSettings({ version: 0 });

    const wallet = JSON.parse(localStorage.getItem('wallet'));
    expect(wallet).to.be.an('object');
    expect(wallet.key).to.equal('somevalue');
    expect(wallet.seed).to.not.exist;
    expect(wallet.subkey.seed).to.not.exist;
  });
});
