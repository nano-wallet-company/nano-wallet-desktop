import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';

import Table from 'ember-light-table';

import PagedMixin from '../../mixins/paged';

export default Component.extend(PagedMixin, {
  @service intl: null,

  wallet: null,
  accounts: null,
  totals: null,
  contentKey: 'accounts',

  // didRender() {
  //   this._super(...arguments);
  //   // this.$('.slick-slider').slick('unslick');
  //   this.$('.slick-list').remove();
  //   this.$('.slick-slider').slick('unslick').slick(this.get('settings'));
  // },

  @computed()
  get settings() {
    return {
      dots: true,
      slidesToShow: (this.get('accounts.length') <= 3) ? this.get('accounts.length') : 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      edgeFriction: true,
      centerPadding: '10px',
      responsive: this.get('breakpoints'),
    };
  },

  @computed()
  get breakpoints() {
    return [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true,
        },
      },
    ];
  },

  @computed('intl.locale')
  get columns() {
    const intl = this.get('intl');
    return [
      {
        label: intl.t('account'),
        valuePath: 'id',
        width: '60%',
        cellComponent: 'account-link',
      },
      {
        label: intl.t('balance'),
        valuePath: 'balance',
        width: '20%',
        cellComponent: 'account-amount',
      },
      {
        label: intl.t('pending'),
        valuePath: 'pending',
        cellComponent: 'account-amount',
      },
    ];
  },

  @computed('columns.@each', 'pagedContent.@each')
  get table() {
    const columns = this.get('columns');
    const pagedContent = this.get('pagedContent');
    return new Table(columns, pagedContent);
  },
});
