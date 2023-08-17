<p align="center">
  <a href="https://www.npmjs.org/package/countdownbar">
    <img src="https://img.shields.io/npm/v/countdownbar.svg">
  </a>
  <a href="https://npmcharts.com/compare/countdownbar?minimal=true">
    <img src="https://img.shields.io/npm/dm/countdownbar.svg">
  </a>
  <br>
</p>

# countdownbar

A countdown bar library for web app.

# Features

- Support for custom templates and styles.
- Support typescript.

# Installation

```bash
# pnpm
$ pnpm add countdownbar

# yarn
$ yarn add countdownbar

# npm
$ npm i countdownbar
```

# Usage

1. Creates a countdown bar instance.

```html
<div id="countdown-bar-container"></div>
```

```ts
import { createCountdownBar } from 'countdownbar'

const countdownBarInstance = createCountdownBar({
  container: '#countdown-bar-container',
  time: 24 * 60 * 60 * 1000
})
```

# Options

| Prop | Type | Default Value | Description |
| :---:| :---: | :---: | :---: |
| `container` | `string`, `HTMLElement` | - | Define a container for countdown bar. |
| `time` | `number` | `0` | Total time, unit milliseconds |
| `autoStart` | `boolean` | `true` | Whether to auto start count down |
| `millisecond` | `boolean` | `false` | Whether to enable millisecond render |
| `color` | `string` | `#323233` | Define `color` of countdown. |
| `fontSize` | `string` | `14px` | Define `font-size` of countdown. |
| `template` | `Function` | - | Custom the template of countdown bar. `(current: CurrentTime) => string` |
| `onChange` | `Function` | - | Emitted when count down changed. `(current: CurrentTime) => void` |
| `onFinish` | `Function` | - | Emitted when count down finished. `() => void` |

# CurrentTime Structure

| Name | Description | Type |
| :---: | :---: | :---: |
| `total` | Total time, unit milliseconds | `number` |
| `days` | Remain days | `number` |
| `hours` | Remain hours | `number` |
| `minutes` | Remain minutes | `number` |
| `seconds` | Remain seconds | `number` |
| `milliseconds` | Remain milliseconds | `number` |

# APIs

## Methods of instance

### start

Start count down.

```ts
countdownBarInstance.start()
```

### pause

Pause count down.

```ts
countdownBarInstance.pause()
```

### reset

Reset count down. Accept a new time as first param, defaults is `options.time`.

```ts
countdownBarInstance.reset()
```

# CHANGE LOG

See [change logs](./CHANGELOG.md) here.