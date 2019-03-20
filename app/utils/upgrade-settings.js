import { Promise } from 'rsvp';
import { run, next } from '@ember/runloop';
import { setProperties } from '@ember/object';

import window from 'ember-window-mock';

const { localStorage } = window;

export const CURRENT_VERSION = 1;

export default async function upgradeSettings(settings) {
  const entries = Object.entries(localStorage).map(([key, data]) => {
    const value = JSON.parse(data, (k, v) => {
      if (typeof v === 'object') {
        delete v.seed; // eslint-disable-line no-param-reassign
        delete v.acceptedTerms; // eslint-disable-line no-param-reassign
      }

      return v;
    });

    return [key, value];
  });

  try {
    await new Promise(resolve => {
      run(localStorage, 'clear', []);
      next(() => resolve());
    });
  } finally {
    await new Promise(resolve => {
      run(() => {
        entries.forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
      });

      next(() => resolve());
    });
  }

  const version = CURRENT_VERSION;
  return setProperties(settings, { version });
}
