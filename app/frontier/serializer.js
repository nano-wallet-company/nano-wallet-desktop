import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class FrontierSerializer extends JSONSerializer {
  primaryKey = 'hash';
}
