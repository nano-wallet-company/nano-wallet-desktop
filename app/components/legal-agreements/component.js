import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';
import { overridableReads } from '@ember-decorators/object/computed';

import LegalAgreementsValidations from '../../validations/legal-agreements';

export default class LegalAgreementsComponent extends Component {
  @service config = null;

  @service settings = null;

  LegalAgreementsValidations = LegalAgreementsValidations;

  @argument eula = false;

  @argument privacyPolicy = false;

  @argument onAgree = null;

  @argument onDisagree = null;

  @overridableReads('config.links.eula') eulaLink = null;

  @overridableReads('config.links.privacyPolicy') privacyPolicyLink = null;
}
