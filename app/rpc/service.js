import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),

  accountInfo(account) {
    return this.get('ajax').post('/', {
      dataType: 'json',
      data: {
        account,
        action: 'account_info'
      }
    });
  }
});
