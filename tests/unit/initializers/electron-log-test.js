import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';
import { run } from '@ember/runloop';
import Application from '@ember/application';
import { initialize } from '@mikron.io/mikron-wallet/initializers/electron-log';
import destroyApp from '../../helpers/destroy-app';

describe('Unit | Initializer | electron-log', () => {
  let application;

  beforeEach(() => {
    run(() => {
      application = Application.create();
      application.deferReadiness();
    });
  });

  afterEach(() => {
    destroyApp(application);
  });

  // Replace this with your real tests.
  it('works', () => {
    initialize(application);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
