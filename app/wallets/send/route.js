import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    sendAmount(changeset) {
      console.log(...arguments);
    }
  }
});
