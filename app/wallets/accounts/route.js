import Route from '@ember/routing/route';

export default Route.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  breadCrumb: {
    title: 'Account',
    path: 'wallets.accounts',
  },
});
