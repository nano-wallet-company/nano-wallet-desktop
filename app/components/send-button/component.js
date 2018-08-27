import Component from '@ember/component';

import { DisposableMixin } from 'ember-lifeline';
import { computed, action } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';

export default Component.extend(DisposableMixin, {
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

  @on('didInsertElement')
  setupKeyboardShortcuts() {
    this.registerDisposable(() => unbindKeyboardShortcuts(this));
    return bindKeyboardShortcuts(this);
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
