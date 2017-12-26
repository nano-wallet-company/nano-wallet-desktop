export function initialize(application) {
  application.inject('controller', 'status', 'service:status');
}

export default {
  initialize,
};
