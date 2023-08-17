import { raf, cancelRaf, inBrowser, parseTime, isSameSecond } from './utils'
import type {
  CountdownBarOptions,
  CountdownBarInstance,
} from './interfaces/core'
import { css } from 'fourdom'

class CountdownBar implements CountdownBarInstance {
  rafId: number = 0
  endTime: number = 0
  counting: boolean = false

  remain = 0

  options: CountdownBarOptions = {
    time: 0,
    autoStart: true,
    color: '#323233',
    fontSize: '14px',
  }

  constructor(opts: CountdownBarOptions) {
    this.options = Object.assign(this.options, opts)
    this.remain = this.options.time

    if (this.options.autoStart) {
      this.start()
    }
  }

  current() {
    return parseTime(this.remain)
  }

  getCurrentRemain() {
    return Math.max(this.endTime - Date.now(), 0)
  }

  setRemain(value: number) {
    this.remain = value
    this.options.onChange?.(this.current())

    if (value === 0) {
      this.pause()
      this.options.onFinish?.()
    }

    this.render()
  }

  microTick() {
    this.rafId = raf(() => {
      // in case of call reset immediately after finish
      if (this.counting) {
        this.setRemain(this.getCurrentRemain())

        if (this.remain > 0) {
          this.microTick()
        }
      }
    })
  }

  macroTick() {
    this.rafId = raf(() => {
      // in case of call reset immediately after finish
      if (this.counting) {
        const remainRemain = this.getCurrentRemain()

        if (!isSameSecond(remainRemain, this.remain) || remainRemain === 0) {
          this.setRemain(remainRemain)
        }

        if (this.remain > 0) {
          this.macroTick()
        }
      }
    })
  }

  tick() {
    // should not start counting in server
    if (!inBrowser) {
      return
    }

    if (this.options.millisecond) {
      this.microTick()
    } else {
      this.macroTick()
    }
  }

  start() {
    if (!this.counting) {
      this.endTime = Date.now() + this.remain
      this.counting = true
      this.tick()
    }
  }

  reset(totalTime?: number) {
    this.pause()
    this.remain = totalTime || this.options.time
    if (this.options.autoStart) {
      this.start()
    }
  }

  pause() {
    this.counting = false
    cancelRaf(this.rafId)
  }

  generateHTML() {
    if (this.options.template) return this.options.template(this.current())

    let content = `${this.current().days}:${this.current().hours}:${
      this.current().minutes
    }:${this.current().seconds}`

    if (this.options.millisecond) {
      content += `:${this.current().milliseconds}`
    }

    return `<span>${content}</span>`
  }

  getContainer() {
    return typeof this.options.container === 'string'
      ? (document.querySelector(this.options.container) as HTMLElement | null)
      : this.options.container
  }

  render() {
    const container = this.getContainer()
    if (!container) return

    css(container, {
      'font-size': this.options.fontSize as string,
      color: this.options.color as string,
    })

    container.innerHTML = `${this.generateHTML()}`
  }
}

const createCountdownBar = (opts: CountdownBarOptions) => {
  return new CountdownBar(opts)
}

export { CountdownBar, createCountdownBar }
