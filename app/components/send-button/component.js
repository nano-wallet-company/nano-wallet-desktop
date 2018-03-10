import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['expand', 'shrink', 'active'],

  wallet: null,

  expand: false,
  shrink: false,
  active: false,

  onOpen: null,
  onClose: null,
});
