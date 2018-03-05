import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['expand', 'shrink', 'active'],
  expand: false,
  shrink: false,
  active: false,
});
