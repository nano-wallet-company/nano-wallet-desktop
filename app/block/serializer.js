import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class BlockSerializer extends JSONSerializer {
  primaryKey = 'block';
}
