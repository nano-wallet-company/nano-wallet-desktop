import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';

export default class WalletOverviewComponent extends Component {
  @service intl = null;

  @argument wallet = null;

  @argument accounts = null;

  @argument currentSlide = 0;

  @argument onChangeSlide = null;

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
  }
}
