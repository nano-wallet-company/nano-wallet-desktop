import Component from '@ember/component';

import { waitForQueue } from 'ember-concurrency';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { ContextBoundTasksMixin, ContextBoundEventListenersMixin } from 'ember-lifeline';

import { on, observes } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

export default class AccountCarouselComponent extends Component.extend(
  ContextBoundTasksMixin,
  ContextBoundEventListenersMixin,
) {
  @argument accounts = null;

  @argument currentSlide = 0;

  @argument onChangeSlide = null;

  slickInstance = null;

  @on('didInsertElement')
  addChangeListener() {
    this.$().on('afterChange', (event, slick, currentSlide) => {
      this.runTask(() => {
        this.set('currentSlide', currentSlide);
      });
    });
  }

  @on('didInsertElement')
  addWheelListener() {
    this.addEventListener('wheel', (event) => {
      event.preventDefault();

      const slickInstance = this.get('slickInstance');
      if (slickInstance) {
        if (event.deltaY < 0) {
          slickInstance.slick('slickNext');
        } else {
          slickInstance.slick('slickPrev');
        }
      }
    });
  }

  @observes('currentSlide')
  currentSlideDidChange() {
    return this.scheduleTask('actions', () => {
      const currentSlide = this.get('currentSlide');
      return this.get('onChangeSlide')(currentSlide);
    });
  }

  @keepLatestTask
  setupSlider = function* setupSliderTask() {
    if (!this.slickInstance && !this.isDestroying) {
      yield waitForQueue('afterRender');

      const responsive = this.get('breakpoints');
      const initialSlide = this.get('currentSlide');
      this.slickInstance = this.$().slick({
        responsive,
        initialSlide,
        adaptiveHeight: true,
        centerPadding: '10px',
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        speed: 200,
        arrows: true,
        respondTo: 'min',
      });
    }

    return yield this.slickInstance;
  }

  @on('didInsertElement')
  attachSlider() {
    return this.get('setupSlider').perform();
  }

  @keepLatestTask
  teardownSlider = function* teardownSliderTask() {
    if (this.slickInstance && !this.isDestroyed) {
      this.slickInstance.slick('unslick');
      this.slickInstance = null;
    }

    return yield this.slickInstance;
  }

  @on('willDestroyElement')
  detachSlider() {
    return this.get('teardownSlider').perform();
  }

  @keepLatestTask
  refreshSlider = function* refreshSlideTask() {
    yield this.get('teardownSlider').perform();
    yield this.get('setupSlider').perform();
    return yield this.slickInstance;
  }

  @observes('accounts.@each')
  accountsDidChange() {
    return this.get('refreshSlider').perform();
  }

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
  }
}
