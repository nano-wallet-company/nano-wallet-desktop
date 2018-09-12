import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class HistorySerializer extends JSONSerializer {
  primaryKey = 'hash';
}
