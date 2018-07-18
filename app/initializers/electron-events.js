import { get } from '@ember/object';

import window from 'ember-window-mock';

import isElectron from '../utils/is-electron';

export function initialize(/* application */) {
  if (isElectron()) {
    const document = get(window, 'document');
    document.addEventListener('dragover', event => event.preventDefault());
    document.addEventListener('drop', event => event.preventDefault());
  }
}

export default {
  initialize,
};
