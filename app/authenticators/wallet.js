import { get } from '@ember/object';

import Base from 'ember-simple-auth/authenticators/base';
import { service } from '@ember-decorators/service';
import { defineError } from 'ember-exex/error';

export const AuthenticatorError = defineError({
  name: 'AuthenticationError',
  message: 'Wallet authentication error',
});

export const AuthenticateError = defineError({
  name: 'AuthenticateError',
  message: 'Unable to authenticate wallet: {wallet}',
  extends: AuthenticatorError,
});

export const InvalidateError = defineError({
  name: 'InvalidateError',
  message: 'Unable to invalidate session',
  extends: AuthenticatorError,
});

export const RestoreError = defineError({
  name: 'RestoreError',
  message: 'Unable to restore session',
  extends: AuthenticatorError,
});

export const WalletLockError = defineError({
  name: 'WalletLocked',
  message: 'Unable to lock wallet: {wallet}',
  extends: InvalidateError,
});

export const NodeNotReadyError = defineError({
  name: 'NodeNotReadyError',
  message: 'Node not ready to restore wallet: {wallet}',
  extends: RestoreError,
});

export const WalletLockedError = defineError({
  name: 'WalletLocked',
  message: 'Wallet locked: {wallet}',
  extends: RestoreError,
});

export default class WalletAuthenticator extends Base {
  @service rpc = null;

  @service electron = null;

  async authenticate({ wallet, password }) {
    try {
      await this.get('rpc').passwordEnter(wallet, password);
    } catch (err) {
      throw new AuthenticateError({ params: { wallet } }).withPreviousError(err);
    }

    return { wallet };
  }

  async invalidate({ wallet }) {
    if (!wallet) {
      throw new InvalidateError();
    }

    const locked = await this.get('rpc').walletLock(wallet);
    if (!locked) {
      throw new WalletLockError({ params: { wallet } });
    }

    return true;
  }

  async restore(data) {
    const { wallet } = data;
    if (!wallet) {
      throw new RestoreError();
    }

    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = get(electron, 'isNodeStarted');
      if (!isNodeStarted) {
        throw new NodeNotReadyError({ params: { wallet } });
      }
    }

    const locked = await this.get('rpc').walletLocked(wallet);
    if (locked) {
      throw new WalletLockedError({ params: { wallet } });
    }

    return data;
  }
}
