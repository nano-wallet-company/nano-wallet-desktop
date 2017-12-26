import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { set } from '@ember/object';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

import { hash } from 'rsvp';

const DEFAULT_INTERVAL = 5000; // 5s

const Service = ObjectProxy.extend(PromiseProxyMixin, {
  @service pollboy: null,
  @service rpc: null,

  poller: null,

  @on('init')
  startPolling() {
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
    const blocks = rpc.blockCount();
    const peers = rpc.peers();
    const promise = hash({
      blocks,
      peers,
    });

    set(this, 'promise', promise);
    return promise;
  },
});

Service.reopenClass({
  isServiceFactory: true,
});

export default Service;
