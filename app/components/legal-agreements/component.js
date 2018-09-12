import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';
import { argument } from '@ember-decorators/argument';

import LegalAgreementsValidations from '../../validations/legal-agreements';

export default class LegalAgreementsComponent extends Component {
  @service config = null;

  @service settings = null;

  LegalAgreementsValidations = LegalAgreementsValidations;

  @argument eula = false;

  @argument privacyPolicy = false;

  @argument onAgree = null;

  @argument onDisagree = null;

  @alias('config.links.eula') eulaLink = null;

  @alias('config.links.privacyPolicy') privacyPolicyLink = null;
}
