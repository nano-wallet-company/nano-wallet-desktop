import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

import { inject as service } from '@ember/service';

import alert from '../../utils/alert';

export default class SetupLegalRoute extends Route {
  @service intl;

  @service settings;

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
