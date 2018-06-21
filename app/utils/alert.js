import { tryInvoke } from '@ember/utils';

import window from 'ember-window-mock';

export default function alert(message) {
  return tryInvoke(window, 'alert', [message]);
}
