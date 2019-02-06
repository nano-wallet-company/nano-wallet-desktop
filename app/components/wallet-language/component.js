import Component from '@ember/component';

import { on } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';

export default class LanguageSettingsComponent extends Component {
  @service intl = null;

  @service intl = null;

  @service settings = null;

  @argument onChangeLanguage = null;

  locales = this.settings.get('availableLocales');

  @on('didRender')
  printLocale() {
    const currentLocales = this.get('intl.locale');
    const [currentLocale] = currentLocales;
    this.setProperties({ currentLocale });
  }
}
