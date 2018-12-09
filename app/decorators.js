import { storageFor } from 'ember-local-storage';

import { computedDecoratorWithParams } from '@ember-decorators/utils/computed';

const storageDecorator = ({ key }, params = []) => storageFor(key, ...params);

export const storage = computedDecoratorWithParams(storageDecorator);

export default {
  storage,
};
