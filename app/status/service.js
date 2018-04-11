import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { set } from '@ember/object';

import {
  runTask,
  runDisposables,
  pollTask,
  cancelPoll,
} from 'ember-lifeline';

import { service } from 'ember-decorators/service';

import { hash } from 'ember-concurrency';

export const STATUS_POLL_INTERVAL = 10 * 1000; // 10s

const Service = ObjectProxy.extend(PromiseProxyMixin, {
  @service rpc: null,

  pollToken: null,

  willDestroy(...args) {
    runDisposables(this);
    return this._super(...args);
  },

  pausePolling() {
    const pollToken = this.get('pollToken');
    if (pollToken) {
      cancelPoll(pollToken);
    }

    return pollToken;
  },

  resumePolling() {
    this.pausePolling();

    const pollToken = pollTask(this, 'onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  },

  onPoll(next) {
    return runTask(this, () => {
      const rpc = this.get('rpc');
      const blocks = rpc.blockCount();
      const peers = rpc.peers().then(p => Object.keys(p));
      const promise = hash({
        blocks,
        peers,
      });

      set(this, 'promise', promise);
      return runTask(this, next, STATUS_POLL_INTERVAL);
    });
  },
});

Service.reopenClass({
  isServiceFactory: true,
});

export default Service;
