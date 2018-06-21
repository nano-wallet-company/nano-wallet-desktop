import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  eula: validatePresence(true),
  privacyPolicy: validatePresence(true),
};
