export default function () {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  // ember-intl
  this.passthrough('/translations/**');

  // Live network
  this.passthrough('http://localhost:7076');

  // Test network
  this.passthrough('http://localhost:55000');

  // Electron proxy
  this.passthrough('https://localhost:17076/**');

  this.passthrough('https://api.coinmarketcap.com/**');

  this.namespace = 'rpc';

  this.post('/', (schema, request) => {
    const params = JSON.parse(request.requestBody);
    return schema.accounts.find(params.account);
  });
}
