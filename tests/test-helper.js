import loadEmberExam from 'ember-exam/test-support/load';
import { mocha, beforeEach, afterEach } from 'mocha';
import { setResolver } from 'ember-mocha';
import { enable, disable } from 'ember-concurrency-retryable';

import resolver from './helpers/resolver';

mocha.setup({ timeout: 5000 });

loadEmberExam();

setResolver(resolver);

beforeEach(() => enable());
afterEach(() => disable());
