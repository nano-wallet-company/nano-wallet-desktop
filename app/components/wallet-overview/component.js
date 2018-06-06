import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  @service intl: null,

  wallet: null,
  accounts: null,
  currentSlide: 0,

  onChangeSlide: null,

  @computed
  get breakpoints() {
    return [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
});
