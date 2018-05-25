import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { DisposableMixin } from 'ember-lifeline';

import nprogress from 'nprogress';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import guessLocale from '../utils/guess-locale';

export default Route.extend(ApplicationRouteMixin, DisposableMixin, {
  @service router: null,
  @service intl: null,
  @service settings: null,
  @service electron: null,

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    const settings = this.get('settings');
    let locale = get(settings, 'locale');
    if (!locale && isElectron) {
      locale = get(electron, 'locale');
    }

    locale = locale || guessLocale();
    this.get('intl').setLocale([locale]);

    if (isElectron) {
      electron.on('exit', () => tryInvoke(electron, 'relaunch'));
    }

    return this._super(...args);
  },

  @action
  loading(transition) {
    nprogress.start();
    transition.finally(() => nprogress.done());
    return true;
  },
});
