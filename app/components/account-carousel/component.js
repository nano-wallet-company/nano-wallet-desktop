import Component from '@ember/component';

import { task, waitForQueue } from 'ember-concurrency';
import { runTask, scheduleTask, runDisposables } from 'ember-lifeline';

import { computed, observes } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

export default Component.extend({
  accounts: null,

  onChangeSlide: null,

  currentSlide: 0,

  slickInstance: null,

  willDestroy(...args) {
    runDisposables(this);
    return this._super(...args);
  },

  @on('didInsertElement')
  addChangeListener() {
    this.$().on('afterChange', (event, slick, currentSlide) => {
      runTask(this, () => {
        this.set('currentSlide', currentSlide);
      });
    });
  },

  @observes('currentSlide')
  currentSlideDidChange() {
    return scheduleTask(this, 'actions', () => {
      const currentSlide = this.get('currentSlide');
      return this.get('onChangeSlide')(currentSlide);
    });
  },

  @on('didInsertElement')
  attachSlider() {
    return this.get('setupSlider').perform();
  },

  setupSlider: task(function* setupSlider() {
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
        slidesToScroll: 4,
        dots: true,
        infinite: false,
        speed: 200,
        arrows: true,
        respondTo: 'min',
      });
    }

    return yield this.slickInstance;
  }).keepLatest(),

  @on('willDestroyElement')
  detachSlider() {
    return this.get('teardownSlider').perform();
  },

  teardownSlider: task(function* teardownSlider() {
    if (this.slickInstance && !this.isDestroyed) {
      this.slickInstance.slick('unslick');
      this.slickInstance = null;
    }

    return yield this.slickInstance;
  }).keepLatest(),

  refreshSlider: task(function* refreshSlider() {
    yield this.get('teardownSlider').perform();
    yield this.get('setupSlider').perform();
    return yield this.slickInstance;
  }).keepLatest(),

  @observes('accounts.@each')
  accountsDidChange() {
    return this.get('refreshSlider').perform();
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
});
