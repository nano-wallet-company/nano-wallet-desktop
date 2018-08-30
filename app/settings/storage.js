import StorageObject from 'ember-local-storage/local/object';

export default class SettingsStorage extends StorageObject {
  static initialState() {
    return {
      acceptedTerms: false,
    };
  }
}
