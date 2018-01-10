import Base from 'ember-simple-auth/authenticators/base';

import { service } from 'ember-decorators/service';

import { defineError } from 'ember-exex/error';

export const AuthenticationError = defineError({
  name: 'AuthenticationError',
  message: 'Authentication error',
});

export default Base.extend({
  @service rpc: null,
  @service store: null,

  async restore({ wallet }) {
    if (!wallet) {
      throw new AuthenticationError('Unable to restore session');
    }

    return { wallet };
  },

  async authenticate({ wallet, password }) {
    try {
      await this.get('rpc').passwordEnter(wallet, password);
    } catch (err) {
      throw new AuthenticationError(err);
    }

    return { wallet };
  },
});
