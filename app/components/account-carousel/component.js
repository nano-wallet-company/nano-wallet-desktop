import Component from '@ember/component';
import { run, debounce, scheduleOnce } from '@ember/runloop';
import { sort } from '@ember/object/computed';

import { computed, observes } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

export default Component.extend({
  accounts: null,

  currentSlide: 0,
  sortedAccounts: sort('accounts', 'sortBy'),

  @computed()
  get sortBy() {
    return ['modifiedTimestamp'];
  },

  slickInstance: null,

  @on('didInsertElement')
  addChangeListener() {
    this.$().on('afterChange', (event, slick, currentSlide) => {
      run(() => {
        if (!this.isDestroying) {
          this.set('currentSlide', currentSlide);
        }
      });
    });
  },

  @on('didInsertElement')
  attachSlider() {
    scheduleOnce('afterRender', this, this.setupSlider);
  },

  setupSlider() {
    if (!this.slickInstance && !this.isDestroying) {
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
        speed: 250,
        arrows: true,
      });
    }

    return this.slickInstance;
  },

  @on('willDestroyElement')
  detachSlider() {
    if (this.slickInstance) {
      if (!this.isDestroyed) {
        this.$().slick('unslick');
      }

      this.slickInstance = null;
    }

    return this.slickInstance;
  },

  refreshSlider() {
    this.detachSlider();
    this.attachSlider();
    return this.slickInstance;
  },

  @observes('sortedAccounts.@each')
  sortedAccountsDidChange() {
    debounce(this, this.refreshSlider, 1000, true);
  },

  @computed()
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
