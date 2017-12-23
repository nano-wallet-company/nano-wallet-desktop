import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function (name, options = {}) {
  module(name, {
    beforeEach(...args) {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, ...args);
      }

      return this.application;
    },

    afterEach(...args) {
      const afterEach = options.afterEach && options.afterEach.apply(this, ...args);
      return resolve(afterEach).then(() => destroyApp(this.application));
    },
  });
}
