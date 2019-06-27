import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class HistorySerializer extends JSONSerializer {
  primaryKey = 'hash';

  // map name from JSON result to internal 'nice' name
  attrs = {
    blockTime: 'block_time',
    accountComment: 'account_comment',
  }
}
