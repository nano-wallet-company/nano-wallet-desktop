import Component from '@ember/component';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { service } from 'ember-decorators/service';

import window from 'ember-window-mock';

export default Component.extend({
  @service electron: null,

  tagName: 'a',

  attributeBindings: ['href'],

  href: null,
  text: null,

  click() {
    const { href, electron } = this.getProperties(['href', 'electron']);
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      electron.openExternal(href);
      return false;
    }

    tryInvoke(window, 'open', [href]);
    return false;
  },
});
