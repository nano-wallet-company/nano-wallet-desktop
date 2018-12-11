export function initialize(appInstance) {
  const env = appInstance.resolveRegistration('config:environment');
  appInstance.registerOptionsForType('globals', { instantiate: false, singleton: true });
  appInstance.register('globals:version', env.version);
  appInstance.inject('component', 'wallet_version', 'globals:version');
}

export default {
  initialize,
};
