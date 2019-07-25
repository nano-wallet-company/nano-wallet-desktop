import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

import LegalAgreementsValidations from '../../validations/legal-agreements';

export default class LegalAgreementsComponent extends Component {
  @service config;

  @service settings;

  LegalAgreementsValidations = LegalAgreementsValidations;

  eula = false;

  privacyPolicy = false;

  onAgree = null;

  onDisagree = null;

  @reads('config.links.eula') eulaLink;

  @reads('config.links.privacyPolicy') privacyPolicyLink;
}
