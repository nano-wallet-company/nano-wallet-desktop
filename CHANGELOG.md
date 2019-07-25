# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.8.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.7.0...v1.8.0) (2019-07-25)


### Features

* upgrade to Nano V19.0 Solidus ([586c6b1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/586c6b1))
* **electron:** support auto-login using system keychain ([b4883ac](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b4883ac))



# [1.7.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.6.2...v1.7.0) (2019-02-23)


### Bug Fixes

* **account-card:** remove disabled attr causing Glimmer cycle issue ([4cebb04](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/4cebb04))
* **account-send:** use new belongsTo relationship paths ([c1f97b9](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c1f97b9))
* **editorconfig:** don't do any auto-formatting to patch files ([de5f244](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/de5f244))
* **get-port:** reject with an actual Error to make Bluebird happy ([7f4d5b0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7f4d5b0))
* **mirage:** exclude Mirage from builds for fix issues with source maps ([2fe145d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2fe145d))
* **send:** reset overview controller on it's route ([ad05121](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ad05121))
* **send:** toggle isExpanded during route activation/deactivation ([67512b6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/67512b6))
* **wallet-settings:** update existing account representatives ([05f1a24](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/05f1a24)), closes [#90](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/90)


### Features

* **app:** add no-referrer policy by meta tag ([f30bfdf](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f30bfdf))
* **app:** use ember-exam to run tests ([df57e23](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/df57e23))
* **electron:** enable deprecation and warning traces during development ([fb15074](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fb15074))
* **electron:** upgrade node to V18.0 ([0434294](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0434294))
* **electron:** upgrade node to V18.0RC3 ([b03a4be](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b03a4be))


### Performance Improvements

* **electron:** update ASAR ordering files ([e54dc90](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e54dc90))
* **wallets-controller:** use wallet_balances over accounts_balances ([3444535](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/3444535))



<a name="1.6.2"></a>
## [1.6.2](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.6.1...v1.6.2) (2019-01-28)


### Bug Fixes

* **electron:** rename dh2048.pem to dhparam.pem ([e75e42c](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e75e42c))



<a name="1.6.1"></a>
## [1.6.1](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.6.0...v1.6.1) (2019-01-28)


### Bug Fixes

* **appdmg:** use `hdiutil detach -force` ([28e8748](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/28e8748))
* **electron:** write dh2048.pem as u+rw ([b614651](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b614651))


### Features

* **electron:** add extra loggin around auto updating ([c706604](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c706604))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.5.0...v1.6.0) (2019-01-28)


### Bug Fixes

* **appdmg:** patch to use err.code over err.exitCode ([7938afc](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7938afc))
* **download-progress:** only calculate ETA when seconds is finite number ([3e0cb2b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/3e0cb2b))
* **electron:** don't claim macOS dark mode support since we're frameless ([2f76606](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2f76606))
* **electron:** use simple timestamp to calculate download elapsed time ([75f29b7](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/75f29b7))


### Features

* **electron:** upgrade node to V17.1 ([19d70ab](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/19d70ab))
* **electron:** upgrade to Electron 4 ([9539f22](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9539f22))
* **frontier:** add frontier to models ([14fe52a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/14fe52a))
* **rpc:** support mode RPC actions ([b70f3dc](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b70f3dc))
* **status-tooltip:** format numbers ([154f6b1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/154f6b1)), closes [#86](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/86)
* **upgrade-settings:** add utility to upgrade settings ([e3bb9f5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e3bb9f5))
* **wallets-controller:** use accounts_balances to update balances ([7fec6f2](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7fec6f2))


### Performance Improvements

* **sum-amounts:** use BigNumber.sum to sum ([db15449](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/db15449))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.4.0...v1.5.0) (2018-12-21)


### Bug Fixes

* **account:** qr code nano prefix ([404bbfc](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/404bbfc))
* **electron:** don't use has-own-prop to check signature header ([0db3380](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0db3380))


### Features

* **electron:** upgrade node to V17.0 (Boulton) ([e521b7d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e521b7d))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.3.1...v1.4.0) (2018-12-01)


### Bug Fixes

* **ajax:** stop using ember-host-manager ([9f66e1e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9f66e1e))
* **app:** use polyfilled assign ([ff34486](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ff34486))
* **electron:** downgrade electron-{forge,packager} ([e4c6f22](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e4c6f22))
* **electron:** patch asar to normalize win32 paths ([cc9f65d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/cc9f65d))
* **electron:** remote afterCopy hook ([0081ad6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0081ad6))
* **electron:** use new code signed node binaries ([97449af](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/97449af))
* **package:** match package author name to cert common name ([07a84b6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/07a84b6))


### Features

* **electron:** add benchmark timing to setup logging ([23f427a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/23f427a))
* **electron:** upgrade darwin node to use OpenSSL 1.1.1a ([5ff6a6a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/5ff6a6a))
* **electron:** upgrade the node to V16.3 ([527c28a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/527c28a))
* **electron:** use new electron-forge and electron-package ([ed2db80](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ed2db80))
* **package:** use ember-auto-import ([3beb16e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/3beb16e))


### Performance Improvements

* **electron:** regenerate asar ordering files ([e39ae0f](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e39ae0f))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.3.0...v1.3.1) (2018-10-14)


### Features

* **electron:** upgrade the node to V16.2 ([2502c60](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2502c60))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.2.1...v1.3.0) (2018-10-02)


### Features

* **electron:** upgrade the node to V16.1 ([5a18e3a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/5a18e3a))
* **package:** upgrade dependencies, including Electron 3 ([b4fda52](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b4fda52))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.2.0...v1.2.1) (2018-09-12)


### Bug Fixes

* **settings:** simplify storageFor decorator ([ea0749e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ea0749e))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.1.0...v1.2.0) (2018-09-12)


### Bug Fixes

* **appveyor:** build environment now includes yarn@1.9.4 ([97ff0b1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/97ff0b1))


### Features

* **electron:** add consistent cross-platform about dialog ([cea3f4b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/cea3f4b))
* **electron:** upgrade the node to V16 :zap: ([53d1f58](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/53d1f58))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.1...v1.1.0) (2018-08-27)


### Bug Fixes

* **electron:** disable download badge ([e773ac3](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e773ac3))
* **electron:** only log RPC requests during development ([91b8ca2](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/91b8ca2))
* **electron:** remove old node logs when upgrading to next version ([2c98ff3](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2c98ff3))
* **intl:** fix ru-ru YAML formatting ([88747d4](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/88747d4))
* **nano-prefix:** added new helper for xrb -> nano conversion ([6fa7edf](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/6fa7edf))


### Features

* **carousel:** horizontal mouse scroll ([e548d7c](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e548d7c))
* **electron:** show native progress when extracting/verifying assets ([f568456](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f568456))
* **electron:** upgrade the node to V15.2 ([dca1d6b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/dca1d6b))


### Performance Improvements

* **electron:** reduce default node resource maximums ([eaf30f0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/eaf30f0))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0...v1.0.1) (2018-07-18)


### Bug Fixes

* **account-send:** locale aware amount validation ([7a71c45](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7a71c45))
* **electron:** disable drag/drop events ([9672baf](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9672baf))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-rc.3...v1.0.0) (2018-07-15)


### Bug Fixes

* **account-send:** prevent wonkiness surrounding the send buttons ([1b4d394](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/1b4d394)), closes [#37](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/37)
* **electron:** properly restart after updates on mac ([43e4c6f](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/43e4c6f))
* **intl:** ensure xx-xx form of locale added when xx form reported ([e6b1468](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e6b1468)), closes [#40](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/40)
* **ui:** account view scroll issue [#26](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/26) ([74637cd](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/74637cd))
* **ui:** copy mnemonic in backup screen issue [#28](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/28) ([336635d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/336635d))
* **ui:** fix [#44](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/44) increase settings icon size ([fd29bb2](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fd29bb2))
* **ui:** further fix to account view scroll [#26](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/26) (still needs styling) ([d8a1561](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d8a1561))
* **ui:** settings modal size increase [#43](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/43) ([258f8f0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/258f8f0))


### Features

* **account-address:** move to nano_ prefixed addresses ([beb83bd](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/beb83bd))
* **account-send:** add notification on send ([a10f2f4](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a10f2f4))
* **download-progress:** show progress percent and ETA when possible ([cc8a093](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/cc8a093))
* **electron:** code signing ([bd8c32f](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bd8c32f))
* **electron:** package rai_node executables within the repo itself ([d38073a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d38073a))



<a name="1.0.0-rc.3"></a>
# [1.0.0-rc.3](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-06-22)


### Bug Fixes

* **intl:** fix key for mnemonic for nl-nl translation ([f542fe1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f542fe1))
* **intl:** fix mnemonic help test for nl-nl translation ([bc2aaeb](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bc2aaeb))


### Features

* **electron:** begin storing previous app version to delete old assets ([f7044ad](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f7044ad))



<a name="1.0.0-rc.2"></a>
# [1.0.0-rc.2](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-06-22)


### Bug Fixes

* **electron:** downloads should go to the downloads directory ([97efe8a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/97efe8a)), closes [#21](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/21)
* **intl:** ignore translations that fail to load ([2264ab0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2264ab0))



<a name="1.0.0-rc.1"></a>
# [1.0.0-rc.1](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.9...v1.0.0-rc.1) (2018-06-21)


### Bug Fixes

* **account-send:** show amount validation errors on change ([b8cdf44](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b8cdf44))
* **app:** remove modal-header class from non-modal components ([a586f33](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a586f33))
* **electron:** grab arch correctly during build ([660132c](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/660132c))
* **electron:** specify secureProtocol for proxy and server ([7f57693](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7f57693))
* **electron:** use node configuration version to determine if outdated ([9ab7ba5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9ab7ba5))
* **status-tooltip:** better syncing check algorithm ([7c2c072](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7c2c072))


### Features

* **electron:** support multi-arch builds (theoretically) ([a99c0f8](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a99c0f8))
* **electron:** update progress while verifying assets ([bbbec69](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bbbec69))
* **legal:** add legal click-throughs ([ab92c6c](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ab92c6c))
* **start:** show loading animation while node is starting ([e5fa75d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e5fa75d))



<a name="1.0.0-beta.9"></a>
# [1.0.0-beta.9](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2018-06-06)


### Bug Fixes

* **account-carousel:** cannot use [@guid](https://github.com/guid) key in Ember 3.2 ([fc2195d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fc2195d))
* **account-send:** allow using new nano_ prefix ([a59b414](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a59b414))
* **app:** stop using flex layout for main element ([25970c6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/25970c6))
* **generate-seed:** use 256-bit entropy when generating mnemonic ([b3b7cfe](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b3b7cfe))
* **mirage:** passthrough translation sideloading ([99f53fd](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/99f53fd))
* **notification-center:** make notifications are visible in small widths ([d5f0710](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d5f0710))
* **rpc:** forgot to add generateId utility ([27d03f7](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/27d03f7))


### Features

* **account-settings:** allow changing account representative ([bf3601a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bf3601a))
* **app:** add new loading animations by exyoris ([a4ea611](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a4ea611))
* **app:** begin using new loading animations ([7ee7e53](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7ee7e53))
* **intl:** add Bulgarian (bg-bg) translation by exyoris ([aa7753d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/aa7753d))
* **intl:** sideload translations ([80403fd](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/80403fd))
* **status-tooltip:** visually distinguish when syncing ([9f5b279](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9f5b279))


### Performance Improvements

* **send-button:** dramatically improve transition animation jank ([07eeef1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/07eeef1))



<a name="1.0.0-beta.8"></a>
# [1.0.0-beta.8](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2018-05-28)


### Bug Fixes

* **app:** disable overflow on app window ([725fa24](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/725fa24))
* **download-progress:** show correct status when updating ([bea00db](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bea00db))
* **intl:** fix invalid YAML ([ebe5bb3](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ebe5bb3))
* **intl:** normalize old locale variants ([2b349f2](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2b349f2))
* **wallet-import:** save wallet seed during import ([f6f4b95](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f6f4b95))



<a name="1.0.0-beta.7"></a>
# [1.0.0-beta.7](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2018-04-11)


### Bug Fixes

* **status-tooltip:** don't start polling until component in viewport ([d274a54](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d274a54))


### Features

* **account-send:** add send max button ([18facbe](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/18facbe))
* **app:** fade in main content on launch ([6139053](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/6139053))
* **balance-overview:** add EUR to convertable currencies ([72116f3](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/72116f3))
* **balance-overview:** routable currency conversion ([05c4fea](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/05c4fea))
* **format-amount:** allow disabling decimal separators ([c0bcff5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c0bcff5))
* **password-toggle:** allow configurable readonly ([49fe4c6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/49fe4c6))
* **settings:** add ability to label accounts ([f8fd082](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f8fd082))
* **wallet-overview:** routable current account ([f313d10](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f313d10))
* **wallet-settings:** save seed during setup and display in settings ([b817737](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b817737))


### Performance Improvements

* **wallets:** use a modal for wallet settings and smooth transitions ([39cad40](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/39cad40))



<a name="1.0.0-beta.6"></a>
# [1.0.0-beta.6](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2018-03-20)


### Bug Fixes

* **account-address:** stop cutting out first character in the middle ([f6881e8](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f6881e8)), closes [#8](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/8)
* **account-carousel:** properly show account card states as they load ([fc9083b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fc9083b)), closes [#12](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/12)
* **electron:** wait for node to become available before ready ([c129b9e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c129b9e)), closes [#10](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/10)
* **format-amount:** integer component must be at least 1 digit ([f384a2b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f384a2b)), closes [#7](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/7)
* **history:** fix history element spacing ([431a725](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/431a725))
* **navbar-toggle:** fix mobile navbar toggle ([e8ae93a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e8ae93a))
* **wallet-overview:** add media queries for small heights ([ad9e321](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ad9e321))


### Features

* **account-card:** add notification when account address copied ([ae90ba2](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ae90ba2)), closes [#9](https://github.com/nano-wallet-company/nano-wallet-desktop/issues/9)
* **account-card:** copy account address when clicked ([d32cf48](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d32cf48))
* **wallet-settings:** truncate representative address ([e17ff4f](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/e17ff4f))



<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2018-03-14)


### Bug Fixes

* **account-history:** adjust history styling to mirror design ([8426a37](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/8426a37))
* **format-amount:** fix import of currency formats ([2f2ee7e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2f2ee7e))
* **package:** remove previous artificial version bump ([510503b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/510503b))
* **setup:** add new translations ([19513e8](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/19513e8))
* **setup:** save wallet after setup route ([79de33f](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/79de33f))
* **wallet-overview:** fix typos and fine tunning ([81fe390](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/81fe390))


### Features

* **navigation-bar:** add markup and style for navigation bar ([9101f74](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9101f74))
* **navigation-bar:** add markup and style for navigation bar ([dabe50b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/dabe50b))
* **setup:** style setup and login flow ([9c98459](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9c98459))
* **wallet-settings:** add confirm password and ability to change rep ([aeccf4d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/aeccf4d))


### Performance Improvements

* **setup:** optimize setup backdrop ([f6c809e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f6c809e))
* **setup:** speed up setup transitions ([336664e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/336664e))



<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2018-02-21)


### Bug Fixes

* **download-progress:** add error handler ([dabac8c](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/dabac8c))
* **electron:** ensure Windows targets use rai_node.exe ([8362414](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/8362414))
* **setup:** fix race conditions around setup and imports of wallets ([f4c6bb5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f4c6bb5))



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-02-20)


### Bug Fixes

* **setup:** disable closing modals when backdrop clicked ([63477ad](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/63477ad))


### Features

* **electron:** add a default context menu ([57ab125](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/57ab125))
* **electron:** give UI feedback when verifying and extracting assets ([a0b6d3e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a0b6d3e))
* **electron:** log more pertinent information during asset downloads ([8edc25d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/8edc25d))
* **electron:** pick random ports for node when the defaults aretaken ([b18bfc0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b18bfc0))
* **intl:** use custom currency formatting to support NANO ([4bbe402](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/4bbe402))



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/nano-wallet-company/nano-wallet-desktop/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-02-19)



<a name="1.0.0-beta.1"></a>
# 1.0.0-beta.1 (2018-02-19)


### Bug Fixes

* Fix bignum helper ([ad22057](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ad22057))
* **electron:** don't use a mixin to start the node ([28df0b6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/28df0b6))
* **electron:** start node when routes require it ([0cc3a1a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0cc3a1a))
* **send:** Fix changing send source ([90ae764](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/90ae764))
* **status:** Fix status translations ([a605d99](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/a605d99))


### Features

* Add app manifest ([9c87c73](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9c87c73))
* Add basic adapters, serialization and services ([fa5e34b](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fa5e34b))
* Add basic data layer ([b7661c5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b7661c5))
* Add basic routes ([d980a4e](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/d980a4e))
* **wallet:** Always restore wallet to storage when entering route ([198d891](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/198d891))
* Add Bootstrap 4 ([313b854](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/313b854))
* **account:** Add account deletion functionality (but disable for now) ([bbd8230](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bbd8230))
* **electron:** add node proxy server ([ed3ad46](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/ed3ad46))
* **electron:** begin accepting RPC callbacks in our proxy ([eb16d65](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/eb16d65))
* **electron:** Electron service ([755deca](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/755deca))
* **history:** Add history routes ([f980907](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f980907))
* **history:** Add row-level coloring to history ([0a04b76](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0a04b76))
* **intl:** Add es-pr translation ([c628b48](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c628b48))
* **overview:** Flesh out overview and send functionality ([378c7d1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/378c7d1))
* **send:** Add send route ([f6c6f24](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/f6c6f24))
* **send:** More idiomatic send amounts ([7bca81d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/7bca81d))
* **setup:** Download rai_node from endpoint ([caaafe5](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/caaafe5))
* **setup:** Full wallet setup with mnemonic backup ([bf3e714](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/bf3e714))
* Auto convert between units ([fa806fe](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/fa806fe))
* **setup:** Implement asset downloader ([8f7ea66](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/8f7ea66))
* **setup:** Start setup routes ([98eec9d](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/98eec9d))
* **status:** Add status service ([89f6714](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/89f6714))
* **status-tooltip:** Add status-tooltip component ([b0ca80a](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/b0ca80a))
* **wallet:** Add wallet authentication using ember-simple-auth ([89edf29](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/89edf29))
* **wallet:** Persist wallet information ([c774075](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/c774075))
* **wallet:** poll for account balance changes within a wallet ([58e3f34](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/58e3f34))
* Add corber ([901fed1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/901fed1))
* Add ember-cli-mirage ([1dfbfab](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/1dfbfab))
* Add ember-electron addon ([0a6d173](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/0a6d173))
* Add ember-intl ([769e3e1](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/769e3e1))
* Add ember-light-table ([1697fa8](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/1697fa8))
* Add new conversion utils ([9c87679](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/9c87679))
* **wallet:** require wallet authentication ([cbc7533](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/cbc7533))
* Add pagination ([26648e8](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/26648e8))
* **wallet:** Use wallet adapter to change seed ([67b84b7](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/67b84b7))
* Add service worker ([2ec94c0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/2ec94c0))
* Full intl support ([6a03a01](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/6a03a01))
* Use ember-cli-content-for-config ([683d9a0](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/683d9a0))


### Performance Improvements

* **ajax:** Add ember-concurrency aware AJAX requests ([af9dbcd](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/af9dbcd))
* **ajax:** Change number of retries ([1fd85d6](https://github.com/nano-wallet-company/nano-wallet-desktop/commit/1fd85d6))
