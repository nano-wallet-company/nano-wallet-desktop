import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';

import Table from 'ember-light-table';

import PagedMixin from '../../mixins/paged';

export default Component.extend(PagedMixin, {
  @service intl: null,

  contentKey: 'history',

  wallet: null,
  account: null,
  history: null,

  @computed('intl.locale')
  get columns() {
    const intl = this.get('intl');
    return [
      {
        label: intl.t('type'),
        valuePath: 'type',
        width: '10%',
      },
      {
        label: intl.t('amount'),
        valuePath: 'amount',
        width: '20%',
        cellComponent: 'account-amount',
      },
      {
        label: intl.t('account'),
        valuePath: 'account',
        // width: '60%',
        cellComponent: 'account-link',
      },
    ];
  },

  @computed('columns', 'pagedContent.@each')
  get table() {
    const columns = this.get('columns');
    const pagedContent = this.get('pagedContent');
    return new Table(columns, pagedContent);
  },
});
