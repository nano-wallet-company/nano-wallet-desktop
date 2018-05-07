import { Adapter } from 'ember-data';

import { service } from 'ember-decorators/service';

export default Adapter.extend({
  @service rpc: null,

  query(store, type, { account, count = 10 }) {
    return this.get('rpc').accountHistory(account, count);
  },
});
