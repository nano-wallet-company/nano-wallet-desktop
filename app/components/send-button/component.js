import Component from '@ember/component';

import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import { computed, action } from 'ember-decorators/object';

export default Component.extend(KeyboardShortcuts, {
  classNameBindings: ['isExpanded:expand'],

  wallet: null,

  isExpanded: false,

  onOpen: null,
  onClose: null,

  @computed
  get keyboardShortcuts() {
    return {
      esc: {
        action: 'cancel',
        scoped: true,
      },
    };
  },

  @action
  cancel() {
    const isExpanded = this.get('isExpanded');
    if (isExpanded) {
      const wallet = this.get('wallet');
      const onClose = this.get('onClose');
      if (onClose) {
        return onClose(wallet);
      }
    }

    return false;
  },
});
