import DS from 'ember-data';

import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class HistoryModel extends Model {
  @belongsTo('account', { async: true }) source;

  @attr({ defaultValue: 'state' }) type;

  @attr account;

  @attr('big-number', { defaultValue: 0 }) amount;
}
