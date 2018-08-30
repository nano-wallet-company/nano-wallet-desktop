import Route from '@ember/routing/route';

export default class SetupRoute extends Route {
  model() {
    return this.store.createRecord('wallet');
  }
}
