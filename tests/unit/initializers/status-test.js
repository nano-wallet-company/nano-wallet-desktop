import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { run } from '@ember/runloop';
import Application from '@ember/application';
import { initialize } from 'raiwallet/initializers/status';
import destroyApp from '../../helpers/destroy-app';

describe('Unit | Initializer | status', () => {
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
