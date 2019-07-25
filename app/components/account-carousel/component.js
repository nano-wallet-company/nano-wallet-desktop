import Component from '@ember/component';

import { ContextBoundTasksMixin, runTask, runDisposables } from 'ember-lifeline';

import { on, observes } from '@ember-decorators/object';

export default class AccountCarouselComponent extends Component.extend(ContextBoundTasksMixin) {
  accounts = null;

  currentSlide = 0;

  onChangeSlide = null;

  swiperInstance = null;

  @on('willDestroyElement')
  destroySwiper() {
    const swiperInstance = this.get('swiperInstance');
    if (swiperInstance) {
      runDisposables(swiperInstance);
      this.set('swiperInstance', null);
    }
  }

  updateSwiper() {
    const swiperInstance = this.get('swiperInstance');
    if (swiperInstance) {
      runTask(swiperInstance, 'forceUpdate');
    }
  }

  @observes('accounts.[]')
  accountsDidChange() {
    return this.scheduleTask('actions', 'updateSwiper');
  }

  get breakpoints() {
    return {
      1500: {
        slidesPerView: 3,
      },

      1200: {
        slidesPerView: 2,
      },

      780: {
        slidesPerView: 1,
      },
    };
  }
}
