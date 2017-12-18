import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('wallets', function() {
    this.route('accounts', { path: '/:id' }, function() {
    });
  });
});

export default Router;
