import Component from '@ember/component';

import ImportWalletValidations from '../../validations/import-wallet';

export default Component.extend({
  ImportWalletValidations,

  wallet: null,
  seed: null,
});
