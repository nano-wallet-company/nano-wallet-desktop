import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({
  total: computed.alias('wallet.balance'),
  activeTab: 'nano',
  actions: {
    update(type) {
      set(this, 'activeTab', type);
    },
  },
});
