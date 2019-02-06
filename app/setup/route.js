import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { set } from '@ember/object';

export default class SetupRoute extends Route {
  @service intl = null;

  @service settings = null;

  model() {
    return this.store.createRecord('wallet');
  }

  @action
  async changeLanguage(language) {
    const intl = this.get('intl');
    intl.setLocale(language);
    const settings = this.get('settings');
    set(settings, 'locale', language);
    return this.transitionTo('index');
  }
}
