import Component from '@ember/component';
import { get } from '@ember/object';

import { computed } from 'ember-decorators/object';

import Table from 'ember-light-table';

import PagedMixin from '../../mixins/paged';
import formatAmount from '../../utils/format-amount';

export default Component.extend(PagedMixin, {
  wallet: null,
  accounts: null,
  totals: null,

  contentKey: 'accounts',

  @computed
  get columns() {
    return [
      {
        label: 'Account',
        valuePath: 'id',
        width: '60%',
        cellComponent: 'account-link',
      },
      {
        label: 'Balance',
        valuePath: 'balance',
        width: '20%',
        cellClassNames: 'text-truncate',
        format(rawValue) {
          return formatAmount(rawValue);
        },
      },
      {
        label: 'Pending',
        valuePath: 'pending',
        cellClassNames: 'text-truncate',
        format(rawValue) {
          return formatAmount(rawValue);
        },
      },
    ];
  },

  @computed('columns', 'pagedContent.@each')
  get table() {
    return new Table(get(this, 'columns'), get(this, 'pagedContent'));
  },
});
