import Base from 'ember-simple-auth/authenticators/base';

import { service } from 'ember-decorators/service';

import { defineError } from 'ember-exex/error';

export const AuthenticationError = defineError({
  name: 'AuthenticationError',
  message: 'Authentication error',
});

export const SessionRestoreError = defineError({
  name: 'SessionRestoreError',
  message: 'Unable to restore session',
  extends: AuthenticationError,
});

export const WalletLockedError = defineError({
  name: 'WalletLocked',
  message: 'Wallet locked',
  extends: SessionRestoreError,
});

export const InvalidPasswordError = defineError({
  name: 'InvalidPasswordError',
  message: 'Invalid password',
  extends: AuthenticationError,
});

export default Base.extend({
  @service rpc: null,
  @service store: null,

  async restore({ wallet }) {
    if (!wallet) {
      throw new SessionRestoreError();
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
      throw new InvalidPasswordError(err);
    }

    return { wallet };
  },
});
