import Component from '@ember/component';

import { inject as service } from '@ember/service';

export default class WalletOverviewComponent extends Component {
  @service intl;

  wallet = null;

  accounts = null;

  currentSlide = 0;

  onChangeSlide = null;
}
