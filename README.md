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
[![Downloads/week](https://img.shields.io/npm/dw/@pankod/pankod-cli.svg)](https://npmjs.org/package/@pankod/pankod-cli)
[![License](https://img.shields.io/npm/l/@pankod/pankod-cli.svg)](https://github.com/Pankod/pankod-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @pankod/pankod-cli
$ pankod COMMAND
running command...
$ pankod (-v|--version|version)
@pankod/pankod-cli/0.2.2 darwin-x64 node-v10.16.0
$ pankod --help [COMMAND]
USAGE
  $ pankod COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pankod add Entity`](#pankod-add-entity)
* [`pankod help [COMMAND]`](#pankod-help-command)

## `pankod add Entity`

Add services, components and more...

```
USAGE
  $ pankod add Entity
  $ pankod add Service
  $ pankod add Page
  $ pankod add FunctionalComponent
  $ pankod add ClassComponent
  $ pankod add Plugin
```

_See code: [src/commands/add/index.ts](https://github.com/Pankod/pankod-cli/blob/v0.2.2/src/commands/add/index.ts)_

## `pankod help [COMMAND]`

display help for pankod

```
USAGE
  $ pankod help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
