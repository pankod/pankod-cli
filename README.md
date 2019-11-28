@pankod/pankod-cli
==================

<p align="center">
  <img src="./cover.gif" />
</p>

Save a lot of time by generating services, components, tests for Pankod Boilerplate projects

[![Maintainability](https://api.codeclimate.com/v1/badges/2c2209c30b0d428bab96/maintainability)](https://codeclimate.com/github/pankod/pankod-cli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c2209c30b0d428bab96/test_coverage)](https://codeclimate.com/github/pankod/pankod-cli/test_coverage)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@pankod/pankod-cli.svg)](https://npmjs.org/package/@pankod/pankod-cli)
[![Downloads/month](https://img.shields.io/npm/dm/@pankod/pankod-cli.svg)](https://npmjs.org/package/@pankod/pankod-cli)
[![License](https://img.shields.io/npm/l/@pankod/pankod-cli.svg)](https://github.com/Pankod/pankod-cli/blob/master/package.json)

<!-- usage -->
# :cake: Usage

Install __globally__
```sh
$ npm install -g @pankod/pankod-cli
```

Add __`pankod`__ object into your `package.json`
```json
{
    ...

    "pankod": {
        "project": "nextjs2" // | nextjs | moleculer | svelte
    }
}
```

Start generating elements
```sh
$ pankod-cli add <element>
```
<!-- usagestop -->
<!-- commands -->
# :package: Elements

### `pankod-cli add <element>`

Add services, components and more...

```sh
  # nextjs2
  $ pankod-cli add Page
  $ pankod-cli add Component

  # nextjs
  $ pankod-cli add Page
  $ pankod-cli add ClassComponent
  $ pankod-cli add FunctionalComponent

  # moleculer  
  $ pankod-cli add Service
  $ pankod-cli add Repository

  # svelte
  $ pankod-cli add Component
```

_See code: [src/commands/add](https://github.com/Pankod/pankod-cli/blob/v0.3.3/src/commands/add/index.ts)_
<!-- elementsstop -->
<!-- customization -->
# :building_construction: Customization

[Checkout Wiki](https://github.com/pankod/pankod-cli/wiki) to read about customization and extending the power of your fingers.
<!-- customization -->
