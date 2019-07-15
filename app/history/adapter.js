import DS from 'ember-data';

import { inject as service } from '@ember/service';

const { Adapter } = DS;

export default class HistoryAdapter extends Adapter {
  @service rpc;

  query(store, type, { account, count = 10 }) {
    return this.get('rpc').accountHistory(account, count);
  }
}
