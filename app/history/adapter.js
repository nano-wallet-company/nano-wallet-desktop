import DS from 'ember-data';

import { service } from '@ember-decorators/service';

const { Adapter } = DS;

export default class HistoryAdapter extends Adapter {
  @service rpc = null;

  query(store, type, { account, count = 10 }) {
    return this.get('rpc').accountHistory(account, count);
  }
}
