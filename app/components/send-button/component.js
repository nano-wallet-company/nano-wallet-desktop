import Component from '@ember/component';
import { action } from '@ember/object';

import { DisposableMixin } from 'ember-lifeline';
import { on } from '@ember-decorators/object';
import { className } from '@ember-decorators/component';
import { bindKeyboardShortcuts, unbindKeyboardShortcuts } from 'ember-keyboard-shortcuts';

export default class SendButtonComponent extends Component.extend(DisposableMixin) {
  @className('expand') isExpanded = false;

  wallet = null;

  onOpen = null;

  onClose = null;

  get keyboardShortcuts() {
    return {
      esc: {
        action: 'cancel',
        scoped: true,
      },
    };
  }

  @on('didInsertElement')
  setupKeyboardShortcuts() {
    this.registerDisposable(() => unbindKeyboardShortcuts(this));
    return bindKeyboardShortcuts(this);
  }

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
  }
}
