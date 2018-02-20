# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/nanocurrency/nano-desktop/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-02-20)


### Bug Fixes

* **setup:** disable closing modals when backdrop clicked ([63477ad](https://github.com/nanocurrency/nano-desktop/commit/63477ad))


### Features

* **electron:** add a default context menu ([57ab125](https://github.com/nanocurrency/nano-desktop/commit/57ab125))
* **electron:** give UI feedback when verifying and extracting assets ([a0b6d3e](https://github.com/nanocurrency/nano-desktop/commit/a0b6d3e))
* **electron:** log more pertinent information during asset downloads ([8edc25d](https://github.com/nanocurrency/nano-desktop/commit/8edc25d))
* **electron:** pick random ports for node when the defaults aretaken ([b18bfc0](https://github.com/nanocurrency/nano-desktop/commit/b18bfc0))
* **intl:** use custom currency formatting to support NANO ([4bbe402](https://github.com/nanocurrency/nano-desktop/commit/4bbe402))



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/nanocurrency/nano-desktop/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-02-19)



<a name="1.0.0-beta.1"></a>
# 1.0.0-beta.1 (2018-02-19)


### Bug Fixes

* Fix bignum helper ([ad22057](https://github.com/nanocurrency/nano-desktop/commit/ad22057))
* **electron:** don't use a mixin to start the node ([28df0b6](https://github.com/nanocurrency/nano-desktop/commit/28df0b6))
* **electron:** start node when routes require it ([0cc3a1a](https://github.com/nanocurrency/nano-desktop/commit/0cc3a1a))
* **send:** Fix changing send source ([90ae764](https://github.com/nanocurrency/nano-desktop/commit/90ae764))
* **status:** Fix status translations ([a605d99](https://github.com/nanocurrency/nano-desktop/commit/a605d99))


### Features

* Add app manifest ([9c87c73](https://github.com/nanocurrency/nano-desktop/commit/9c87c73))
* Add basic adapters, serialization and services ([fa5e34b](https://github.com/nanocurrency/nano-desktop/commit/fa5e34b))
* Add basic data layer ([b7661c5](https://github.com/nanocurrency/nano-desktop/commit/b7661c5))
* Add basic routes ([d980a4e](https://github.com/nanocurrency/nano-desktop/commit/d980a4e))
* **wallet:** Always restore wallet to storage when entering route ([198d891](https://github.com/nanocurrency/nano-desktop/commit/198d891))
* Add Bootstrap 4 ([313b854](https://github.com/nanocurrency/nano-desktop/commit/313b854))
* **account:** Add account deletion functionality (but disable for now) ([bbd8230](https://github.com/nanocurrency/nano-desktop/commit/bbd8230))
* **electron:** add node proxy server ([ed3ad46](https://github.com/nanocurrency/nano-desktop/commit/ed3ad46))
* **electron:** begin accepting RPC callbacks in our proxy ([eb16d65](https://github.com/nanocurrency/nano-desktop/commit/eb16d65))
* **electron:** Electron service ([755deca](https://github.com/nanocurrency/nano-desktop/commit/755deca))
* **history:** Add history routes ([f980907](https://github.com/nanocurrency/nano-desktop/commit/f980907))
* **history:** Add row-level coloring to history ([0a04b76](https://github.com/nanocurrency/nano-desktop/commit/0a04b76))
* **intl:** Add es-pr translation ([c628b48](https://github.com/nanocurrency/nano-desktop/commit/c628b48))
* **overview:** Flesh out overview and send functionality ([378c7d1](https://github.com/nanocurrency/nano-desktop/commit/378c7d1))
* **send:** Add send route ([f6c6f24](https://github.com/nanocurrency/nano-desktop/commit/f6c6f24))
* **send:** More idiomatic send amounts ([7bca81d](https://github.com/nanocurrency/nano-desktop/commit/7bca81d))
* **setup:** Download rai_node from endpoint ([caaafe5](https://github.com/nanocurrency/nano-desktop/commit/caaafe5))
* **setup:** Full wallet setup with mnemonic backup ([bf3e714](https://github.com/nanocurrency/nano-desktop/commit/bf3e714))
* Auto convert between units ([fa806fe](https://github.com/nanocurrency/nano-desktop/commit/fa806fe))
* **setup:** Implement asset downloader ([8f7ea66](https://github.com/nanocurrency/nano-desktop/commit/8f7ea66))
* **setup:** Start setup routes ([98eec9d](https://github.com/nanocurrency/nano-desktop/commit/98eec9d))
* **status:** Add status service ([89f6714](https://github.com/nanocurrency/nano-desktop/commit/89f6714))
* **status-tooltip:** Add status-tooltip component ([b0ca80a](https://github.com/nanocurrency/nano-desktop/commit/b0ca80a))
* **wallet:** Add wallet authentication using ember-simple-auth ([89edf29](https://github.com/nanocurrency/nano-desktop/commit/89edf29))
* **wallet:** Persist wallet information ([c774075](https://github.com/nanocurrency/nano-desktop/commit/c774075))
* **wallet:** poll for account balance changes within a wallet ([58e3f34](https://github.com/nanocurrency/nano-desktop/commit/58e3f34))
* Add corber ([901fed1](https://github.com/nanocurrency/nano-desktop/commit/901fed1))
* Add ember-cli-mirage ([1dfbfab](https://github.com/nanocurrency/nano-desktop/commit/1dfbfab))
* Add ember-electron addon ([0a6d173](https://github.com/nanocurrency/nano-desktop/commit/0a6d173))
* Add ember-intl ([769e3e1](https://github.com/nanocurrency/nano-desktop/commit/769e3e1))
* Add ember-light-table ([1697fa8](https://github.com/nanocurrency/nano-desktop/commit/1697fa8))
* Add new conversion utils ([9c87679](https://github.com/nanocurrency/nano-desktop/commit/9c87679))
* **wallet:** require wallet authentication ([cbc7533](https://github.com/nanocurrency/nano-desktop/commit/cbc7533))
* Add pagination ([26648e8](https://github.com/nanocurrency/nano-desktop/commit/26648e8))
* **wallet:** Use wallet adapter to change seed ([67b84b7](https://github.com/nanocurrency/nano-desktop/commit/67b84b7))
* Add service worker ([2ec94c0](https://github.com/nanocurrency/nano-desktop/commit/2ec94c0))
* Full intl support ([6a03a01](https://github.com/nanocurrency/nano-desktop/commit/6a03a01))
* Use ember-cli-content-for-config ([683d9a0](https://github.com/nanocurrency/nano-desktop/commit/683d9a0))


### Performance Improvements

* **ajax:** Add ember-concurrency aware AJAX requests ([af9dbcd](https://github.com/nanocurrency/nano-desktop/commit/af9dbcd))
* **ajax:** Change number of retries ([1fd85d6](https://github.com/nanocurrency/nano-desktop/commit/1fd85d6))
