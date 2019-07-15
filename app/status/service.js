import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { set } from '@ember/object';

import { ContextBoundTasksMixin } from 'ember-lifeline';
import { inject as service } from '@ember/service';
import { hash } from 'ember-concurrency';

export const STATUS_POLL_INTERVAL = 10 * 1000; // 10s

export default class StatusService extends ObjectProxy.extend(
  PromiseProxyMixin,
  ContextBoundTasksMixin,
) {
  @service rpc;

  static isServiceFactory = true;

  pollToken = null;

  pausePolling() {
    const pollToken = this.get('pollToken');
    if (pollToken) {
      this.cancelPoll(pollToken);
    }

    return pollToken;
  }

  resumePolling() {
    this.pausePolling();

    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  }

  onPoll(next) {
    return this.runTask(() => {
      const rpc = this.get('rpc');
      const blocks = rpc.blockCount();
      const peers = rpc.peers().then(p => Object.keys(p));
      const promise = hash({
        blocks,
        peers,
      });

      set(this, 'promise', promise);
      return this.runTask(next, STATUS_POLL_INTERVAL);
    });
  }
}
