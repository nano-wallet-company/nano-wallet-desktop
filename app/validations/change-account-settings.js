import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  label: validatePresence(true),
};
