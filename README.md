# Mikron Wallet

[![Travis CI Status](https://travis-ci.org/mikroncoin/mikron_wallet.svg?branch=master)](https://travis-ci.org/mikroncoin/mikron_wallet) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/917e9ui37nwt4i00/branch/master?svg=true)](https://ci.appveyor.com/project/catenocrypt/mikron_wallet)

The primary [Mikron](https://mikron.io) wallet; a cross-platform, nice-looking wallet implementation.

It is based on Nano Company Desktop Wallet (https://nanowalletcompany.com).

[![Screenshot](public/images/screenshot.png)](public/images/screenshot.png)

This is an Ember application that can build into an [Electron](https://electronjs.org/) app.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (>=10.2)
* [Yarn](https://yarnpkg.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/mikroncoin/mikron_wallet.git`
* `cd mikron_wallet`
* `yarn install`

## Running / Development

### Simple
* `yarn electron:start`
* The app will open in standalone electron session with developer tools

### Standalone node
* Make sure you have `mikron_node` running with the following settings:
  * `"rpc_enable: "true"`
  * `"port": "55000"`
  * `"enable_control": "true"`
* Run `yarn start`
* Visit the app at [http://localhost:4200](http://localhost:4200).
* Visit the tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `npx ember help generate` for more details.

### Running Tests

* `yarn test`
* `yarn test --server`

### Linting

* `yarn run lint:js`
* `yarn run lint:js --fix`

### Building

* `yarn run build` (development)
* `yarn run build --environment production` (production)

### Build installer

* `yarn   cross-env NODE_ENV=production ember electron:build -e production`
* `yarn   cross-env NODE_ENV=production ember electron:make -e production --build-path electron-out/ember`

### Using Docker Compose

You can optionally develop and test using [Docker Compose](https://docs.docker.com/compose/).

* `docker-compose build`
* `docker-compose run --rm --service-ports app`

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
