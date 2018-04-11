import { setApplication } from '@ember/test-helpers';
import { beforeEach, afterEach } from 'mocha';
import { enable, disable } from 'ember-concurrency-retryable';

import Application from '../app';
import config from '../config/environment';

setApplication(Application.create(config.APP));

beforeEach(() => enable());
afterEach(() => disable());
