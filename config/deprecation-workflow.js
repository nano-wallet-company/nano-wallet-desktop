window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'deprecate-router-events' },
    { handler: 'silence', matchId: 'ember-component.send-action' },
    { handler: 'silence', matchId: 'ember-mocha.setup-test' },
    { handler: 'silence', matchId: 'ember-polyfills.deprecate-merge' },
    { handler: 'silence', matchId: 'ember-runtime.deprecate-copy-copyable' },
    { handler: 'silence', matchId: 'ember-views.curly-components.jquery-element' },
    { handler: 'silence', matchId: 'events.remove-all-listeners' },
    { handler: 'silence', matchId: 'remove-handler-infos' },
  ],
};
