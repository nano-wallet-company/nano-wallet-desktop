import Route from '@ember/routing/route';
import { set } from '@ember/object';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

import alert from '../../utils/alert';

export default class SetupLegalRoute extends Route {
  @service intl = null;

  @service settings = null;

  @action
  agree() {
    const settings = this.get('settings');
    set(settings, 'acceptedTerms', true);
    return this.transitionTo('index');
  }

  @action
  disagree() {
    const settings = this.get('settings');
    set(settings, 'acceptedTerms', false);

    const message = this.get('intl').t('legal.cannotDisagree');
    alert(message);

    return this.transitionTo('index');
  }
}
