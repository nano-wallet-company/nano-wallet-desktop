import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { set } from '@ember/object';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

import { hash } from 'rsvp';

const DEFAULT_INTERVAL = 10000; // 10s

const Service = ObjectProxy.extend(PromiseProxyMixin, {
  @service pollboy: null,
  @service rpc: null,

  poller: null,

  @on('init')
  setupPoller() {
    const pollboy = this.get('pollboy');
    this.poller = pollboy.add(this, this.onPoll, DEFAULT_INTERVAL);
    this.poller.pause();
  },

  pausePolling() {
    const poller = this.get('poller');
    if (poller) {
      poller.pause();
    }
  },

  resumePolling() {
    const poller = this.get('poller');
    if (poller) {
      poller.resume();
    }
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
    const peers = rpc.peers().then(p => Object.keys(p));
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
