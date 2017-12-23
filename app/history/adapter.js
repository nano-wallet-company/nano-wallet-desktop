import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.Adapter.extend({
  rpc: service(),

  query(store, type, { account, count = 10 }) {
    return this.get('rpc').accountHistory(account, count);
  },
});
