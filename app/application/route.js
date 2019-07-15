import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { get, getWithDefault, action } from '@ember/object';

import fetch from 'fetch';
import nprogress from 'nprogress';
import { all } from 'rsvp';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { DisposableMixin } from 'ember-lifeline';

import { inject as service } from '@ember/service';

import upgradeSettings from '../utils/upgrade-settings';
import guessLocale, { DEFAULT_LOCALE } from '../utils/guess-locale';
import normalizeLocale from '../utils/normalize-locale';
import reload from '../utils/reload';

export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin, DisposableMixin) {
  @service intl;

  @service config;

  @service settings;

  @service electron;

  async beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    const settings = this.get('settings');
    const version = getWithDefault(settings, 'version', 0);
    if (version < 1) {
      await upgradeSettings(settings);
    }

    let currentLocale = get(settings, 'locale');
    if (!currentLocale && isElectron) {
      currentLocale = get(electron, 'locale');
    }

    currentLocale = normalizeLocale(currentLocale || guessLocale());

    const intl = this.get('intl');
    const config = this.get('config');
    const rootURL = get(config, 'rootURL');
    const locales = [currentLocale, DEFAULT_LOCALE];
    if (currentLocale.split('-').length < 2) {
      locales.unshift(`${currentLocale}-${currentLocale}`);
    }

    const promises = A(locales)
      .uniq()
      .map(async key => {
        try {
          const response = await fetch(`${rootURL}translations/${key}.json`);
          if (response.ok) {
            const data = await response.json();
            intl.addTranslations(key, data);
          }
        } catch (e) {
          return null;
        }

        return key;
      });

    await all(promises);

    intl.setLocale(locales);

    if (isElectron) {
      this.registerDisposable(() => electron.off('exit', reload));
      electron.one('exit', reload);
    }

    return super.beforeModel(...args);
  }

  @action
  loading(transition) {
    nprogress.start();
    transition.finally(() => nprogress.done());
    return true;
  }
}
