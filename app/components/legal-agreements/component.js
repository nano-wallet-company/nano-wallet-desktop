import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { overridableReads } from '@ember-decorators/object/computed';

import LegalAgreementsValidations from '../../validations/legal-agreements';

export default class LegalAgreementsComponent extends Component {
  @service config;

  @service settings;

  LegalAgreementsValidations = LegalAgreementsValidations;

  eula = false;

  privacyPolicy = false;

  onAgree = null;

  onDisagree = null;

  @overridableReads('config.links.eula') eulaLink;

  @overridableReads('config.links.privacyPolicy') privacyPolicyLink;
}
