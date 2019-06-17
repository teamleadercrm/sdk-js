## [unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [3.5.0] - 2019-06-17

### Added

- Added new domains & actions ([@duivvv](https://github.com/duivvv) in [#54](https://github.com/teamleadercrm/sdk-js/pull/54))

### Changed

- If `getAccessToken()` returns `undefined` the authorization header will be omitted ([@ratheDot](https://github.com/rathesDot) in [#55](https://github.com/teamleadercrm/sdk-js/pull/55))

### Deprecated

### Removed

### Fixed

## [3.4.0] - 2019-05-09

- Added `fetchAll` option to enable fetching all data across pages ([@duivvv](https://github.com/duivvv) in [#39](https://github.com/teamleadercrm/sdk-js/pull/39))

## [3.3.0] - 2019-02-26

### Added

- Added `additionalActions` option when configuring the API object ([@duivvv](https://github.com/duivvv) in [#47](https://github.com/teamleadercrm/sdk-js/pull/47))

### Deprecated

- Deprecated `customActions` & `createDomainWithActions` in favour of `additionalActions` ([@duivvv](https://github.com/duivvv) in [#47](https://github.com/teamleadercrm/sdk-js/pull/47))

## [3.2.2] - 2019-02-25

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
