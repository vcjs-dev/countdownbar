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
  template?: (current: CurrentTime) => string
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

export interface CountdownBarInstance {
  start: () => void
  pause: () => void
  reset: (totalTime: number) => void
  get current(): CurrentTime
}

export type CreateCountdownBar = (
  opts: CountdownBarOptions,
) => CountdownBarInstance
