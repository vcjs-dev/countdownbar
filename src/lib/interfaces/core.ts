export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

export type CountdownBarOptions = {
  container?: string | HTMLElement
  autoStart?: boolean
  time: number
  millisecond?: boolean
  color?: string
  fontSize?: string
  template?: (current: CurrentTime) => string
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

export interface CountdownBarInstance {
  endTime: number
  counting: boolean
  remain: number
  get current(): CurrentTime
  start: () => void
  pause: () => void
  reset: (totalTime?: number) => void
  tick(): void
  render(): void
}

export type CreateCountdownBar = (
  opts: CountdownBarOptions,
) => CountdownBarInstance
