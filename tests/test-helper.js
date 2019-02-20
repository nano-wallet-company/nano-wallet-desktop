import loadEmberExam from 'ember-exam/test-support/load';
import { beforeEach, afterEach } from 'mocha';
import { setResolver } from 'ember-mocha';
import { enable, disable } from 'ember-concurrency-retryable';

import resolver from './helpers/resolver';

loadEmberExam();

setResolver(resolver);

beforeEach(() => enable());
afterEach(() => disable());
