type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

type CountdownBarOptions = {
  container?: string | HTMLElement
  autoStart?: boolean
  time: number
  millisecond?: boolean
  template?: (current: CurrentTime) => string
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

interface CountdownBarInstance {
  start: () => void
  pause: () => void
  reset: (totalTime: number) => void
  get current(): CurrentTime
}

type CreateCountdownBar = (
  opts: CountdownBarOptions,
) => CountdownBarInstance

declare const createCountdownBar: CreateCountdownBar

export { CountdownBarInstance, CountdownBarOptions, CreateCountdownBar, CurrentTime, createCountdownBar };
