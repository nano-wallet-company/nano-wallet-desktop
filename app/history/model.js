import DS from 'ember-data';

import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class HistoryModel extends Model {
  @belongsTo('account', { async: true, inverse: 'history' }) source;

  @attr('string', { defaultValue: 'state' }) type;

  @attr('string') account;

  @attr('big-number', { defaultValue: 0 }) amount;
}
