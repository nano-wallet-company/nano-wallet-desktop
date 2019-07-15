import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { inject as service } from '@ember/service';

export default class LogoutRoute extends Route {
  @service session;

  @service electron;

  async beforeModel() {
    const session = this.get('session');
    const wallet = get(session, 'data.wallet');
    if (wallet) {
      const electron = this.get('electron');
      const isElectron = get(electron, 'isElectron');
      if (isElectron) {
        await electron.deletePassword(wallet);
      }
    }

    return session.invalidate();
  }
}
