import Route from '@ember/routing/route';

export default class WalletsIndexRoute extends Route {
  redirect() {
    return this.transitionTo('wallets.overview');
  }
}
