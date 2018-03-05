import { get } from '@ember/object';

import Base from 'ember-simple-auth/authenticators/base';

import { service } from 'ember-decorators/service';

import { defineError } from 'ember-exex/error';

export const AuthenticatorError = defineError({
  name: 'AuthenticationError',
  message: 'Wallet authenticator error',
});

export const RestoreError = defineError({
  name: 'RestoreError',
  message: 'Unable to restore wallet',
  extends: AuthenticatorError,
});

export const NodeNotStartedError = defineError({
  name: 'NodeStoppedError',
  message: 'Node not started',
  extends: RestoreError,
});

export const WalletLockedError = defineError({
  name: 'WalletLocked',
  message: 'Wallet locked',
  extends: RestoreError,
});

export const AuthenticateError = defineError({
  name: 'AuthenticateError',
  message: 'Unable to authenticate wallet',
  extends: AuthenticatorError,
});

export default Base.extend({
  @service rpc: null,
  @service store: null,
  @service electron: null,

  async restore({ wallet }) {
    if (!wallet) {
      throw new RestoreError();
    }

    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        throw new NodeNotStartedError();
      }
    }

    const locked = await this.get('rpc').walletLocked(wallet);
    if (locked) {
      throw new WalletLockedError();
    }

    return { wallet };
  },

  async authenticate({ wallet, password }) {
    try {
      await this.get('rpc').passwordEnter(wallet, password);
    } catch (err) {
      throw new AuthenticateError().withPreviousError(err);
    }

    return { wallet };
  },
});
