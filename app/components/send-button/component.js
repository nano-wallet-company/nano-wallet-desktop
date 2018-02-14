import Component from '@ember/component';
import { action } from 'ember-decorators/object';

export default Component.extend({
  classNames: ['wrapper'],
  classNameBindings: ['expand', 'shrink'],
  expand: false,
  shrink: false,
  firstTime: true,
  @action
  toggleButton() {
    if (this.get('firstTime')) {
      this.set('firstTime', false);
      this.toggleProperty('expand');
    } else {
      this.toggleProperty('shrink');
      this.toggleProperty('expand');
    }
  },
});
