import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import window from 'ember-window-mock';

export default function reload(force = false) {
  const location = get(window, 'location');
  return tryInvoke(location, 'reload', [force]);
}
