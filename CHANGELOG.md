# Changelog

All notable changes to this project will be documented in this file. This project uses [Semantic Versioning](https://semver.org/)

## [Version 2.0.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v2.0.0) (2021-11-13)

### Changes

- This plugin is deprciated and will no longer receive updates.
- Pleas switch to [homebridge-switchbot](https://github.com/OpenWonderLabs/homebridge-switchbot), the new switchbot plugin.

## [Version 1.6.1](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.6.1) (2021-08-29)

### Changes

- Fixes FATAL ERROR:  ad_id is not defined

## [Version 1.6.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.6.0) (2021-08-26)

### Changes
- Add openCloseThreshold to Homebridge Config UI X
- House Keeping and Update dependencies.

## [Version 1.5.1](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.5.1) (2021-08-01)

### Changes

- House Keeping and Update dependencies.

## [Version 1.5.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.5.0) (2021-07-30)

### Changes

- Set current position to actual device position (#193) 
- add configurable "open/close threshold" (#211)
- House Keeping and Update dependencies.

## [Version 1.4.1](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.4.1) (2021-07-28)

### Changes

- Fix Custom UI not loading.

## [Version 1.4.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.4.0) (2021-07-28)

### Changes

- Add Custom UI.
- House Keeping and Update dependencies.

## [Version 1.3.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases/tag/v1.3.0) (2021-07-13)

### Changes

- Add retry support to address disconnects.
- House Keeping and Update dependencies.

## [Version 1.2.10](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2021-02-19)

### Changes

- House Keeping and Update dependencies.

## [Version 1.2.9](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2021-01-21)

### Changes

- Fixed issues from `v1.2.8`.

## [Version 1.2.8](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2021-01-21)

### Changes

- Update Dependencies
  - Node-SwitchBot v1.0.0
    - Fix for "No device was found" in MacOS

## [Version 1.2.7](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-12-22)

### Changes

- Fixed issues from `v1.2.6`.

## [Version 1.2.6](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-12-21)

### Changes

- Fixed issue with `config.schema.json` not being packaged in `v1.2.4`.
- Update dependencies.

## [Version 1.2.5](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-12-21)

### Changes

- Fixed issue with `config.schema.json` not being packaged in `v1.2.4`.
- Update Dependencies.

## [Version 1.2.4](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-12-21)

### Changes

- Support Homebridge config setting UI. (Thanks to [@donavanbecker](https://github.com/SwitchBot/homebridge-switchbot-ble/pull/24))
- Fixed TypeError: this.config.devices is not iterable. (Thanks to [@donavanbecker](https://github.com/SwitchBot/homebridge-switchbot-ble/pull/23))

## [Version 1.2.3](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-11-30)

### Changes

- Fixed the incorrect state of Bot in Home App when control fails.
- Modify log messages. (Thanks to [@dnicolson](https://github.com/SwitchBot/homebridge-switchbot-ble/pull/15))

## [Version 1.2.2](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-11-19)

### Changes

- Fixed Curtain state will not be updated in the Home App.

## [Version 1.2.1](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-11-12)

### Changes

- Get temperature and humidity from Meter advertising periodically.

## [Version 1.2.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-11-06)

### Changes

- Fixed HomeKit control direction reversal issue.
- Add option for inverted curtain position. (Thanks to [@whatUwant](https://github.com/SwitchBot/homebridge-switchbot-ble/pull/4))

## [Version 1.1.0](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-10-29)

### Changes

- Add support for Curtain.

## [Version 1.0.1](https://github.com/OpenWonderLabs/homebridge-switchbot-ble/releases) (2020-10-22)

### Changes

- First public release, supports Bot.
