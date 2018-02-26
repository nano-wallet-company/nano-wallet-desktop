import Component from '@ember/component';

export default Component.extend({
  classNames: ['wrapper'],
  classNameBindings: ['expand', 'shrink', 'active'],
  expand: false,
  shrink: false,
  active: false,
});
