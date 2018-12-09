import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class WalletSerializer extends JSONSerializer {
  primaryKey = 'wallet';
}
