import { raf, cancelRaf, inBrowser, parseTime, isSameSecond } from './utils'
import type {
  CountdownBarOptions,
  CountdownBarInstance,
} from './interfaces/core'

class CountdownBar implements CountdownBarInstance {
  rafId: number = 0
  endTime: number = 0
  counting: boolean = false
  deactivated: boolean = false

  remain = 0

  options: CountdownBarOptions = {
    time: 0,
  }

  get current() {
    return parseTime(this.remain)
  }

  constructor(opts: CountdownBarOptions) {
    this.options = Object.assign(this.options, opts)
    this.remain = this.options.time
  }

  getCurrentRemain() {
    return Math.max(this.endTime - Date.now(), 0)
  }

  setRemain(value: number) {
    this.remain = value
    this.options.onChange?.(this.current)

    if (value === 0) {
      this.pause()
      this.options.onFinish?.()
    }
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

  reset(totalTime: number = this.options.time) {
    this.pause()
    this.remain = totalTime
  }

  pause() {
    this.counting = false
    cancelRaf(this.rafId)
  }
}

const createCountdownBar = (opts: CountdownBarOptions) => {
  return new CountdownBar(opts)
}

export { CountdownBar, createCountdownBar }
