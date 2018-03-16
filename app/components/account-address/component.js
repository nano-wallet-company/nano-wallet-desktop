import Component from '@ember/component';
import { bool } from '@ember/object/computed';

import { observes } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

export const MINIMUM_LENGTH = 64;

export default Component.extend({
  tagName: 'span',
  isVisible: bool('value'),

  value: null,
  truncate: 0,

  attributeBindings: ['title', 'translate'],
  translate: false,

  head: null,
  body: null,
  tail: null,

  @on('init')
  @observes('value')
  valueDidChange() {
    const value = this.get('value');
    if (value) {
      const str = String(value);
      if (str.length >= MINIMUM_LENGTH) {
        const head = str.slice(0, 9);
        const body = str.slice(9, -5);
        const tail = str.slice(-5);
        this.setProperties({ head, body, tail });
      }
    }
  },
});
