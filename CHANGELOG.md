## [unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

- Made sure `byId` key is set in response when data is empty for normalize plugin ([@mikeverf](https://github.com/mikeverf) in [#45](https://github.com/teamleadercrm/sdk-js/pull/45))

## [3.2.1] - 2019-02-20

### Fixed

- Fixed a bug that caused `version` at global level not to be passed down. ([@duivvv](https://github.com/duivvv) in [#44](https://github.com/teamleadercrm/sdk-js/pull/44))

## [3.2.0] - 2019-02-20

### Changed

- Made accessToken/getAccessToken optional ([@duivvv](https://github.com/duivvv) in [#43](https://github.com/teamleadercrm/sdk-js/pull/43))

## [3.1.0] - 2018-11-27

### Added

- Version option to the configuration (local and global level) ([@duivvv](https://github.com/duivvv) in [#36](https://github.com/teamleadercrm/sdk-js/pull/36))

## [3.0.0] - 2018-11-15

### Changed

- Refactored the internal structure ([@duivvv](https://github.com/duivvv) in [#34](https://github.com/teamleadercrm/sdk-js/pull/34))
- [BREAKING] changed the `createDomain` export to `createDomainWithActions` ([@duivvv](https://github.com/duivvv) in [#34](https://github.com/teamleadercrm/sdk-js/pull/34))
- [BREAKING] moved plugins into a general configuration object at local level ([@duivvv](https://github.com/duivvv) in [#34](https://github.com/teamleadercrm/sdk-js/pull/34))
- initial CHANGELOG
