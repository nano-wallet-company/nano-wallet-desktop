import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function routerMap() {
  return this.route('wallets', { path: '/:wallet_id' }, function walletsRoute() {
    this.route('overview');
    this.route('send');
    this.route('accounts', { path: '/:account_id' }, function accountsRoute() {
      this.route('send');
      this.route('history');
    });
  });
});

export default Router;
