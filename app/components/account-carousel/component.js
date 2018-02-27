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
        dots: true,
        infinite: false,
        mobileFirst: true,
        speed: 250,
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ];
  },
});
