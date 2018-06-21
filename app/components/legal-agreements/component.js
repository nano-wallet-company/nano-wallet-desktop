import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

import LegalAgreementsValidations from '../../validations/legal-agreements';

export default Component.extend({
  @service config: null,
  @service settings: null,

  LegalAgreementsValidations,

  eula: false,
  privacyPolicy: false,

  onAgree: null,
  onDisagree: null,

  @alias('config.links.eula') eulaLink: null,
  @alias('config.links.privacyPolicy') privacyPolicyLink: null,
});
