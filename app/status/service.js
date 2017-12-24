import Service from '@ember/service';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { get, set } from '@ember/object';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

import { hash } from 'rsvp';

const DEFAULT_INTERVAL = 5000; // 5s

const DataProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Service.extend({
  @service pollboy: null,
  @service rpc: null,

  poller: null,
  proxy: null,

  @on('init')
  startPolling() {
    const proxy = DataProxy.create();
    this.set('proxy', proxy);

    const pollboy = this.get('pollboy');
    const poller = pollboy.add(this, this.onPoll, DEFAULT_INTERVAL);
    this.set('poller', poller);
  },

  willDestroy(...args) {
    this._super(...args);

    const poller = this.get('poller');
    if (poller) {
      this.get('pollboy').remove(poller);
    }
  },

  async onPoll() {
    const rpc = this.get('rpc');
    const proxy = this.get('proxy');
    const blocks = rpc.blockCount();
    const peers = rpc.peers().then(r => get(Object.keys(r), 'length'));
    const promise = hash({
      blocks,
      peers,
    });

    set(proxy, 'promise', promise);
    return proxy;
  },
});
