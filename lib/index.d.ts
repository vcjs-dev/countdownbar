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
  color?: string
  fontSize?: string
  template?: (current: CurrentTime) => string
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

interface CountdownBarInstance {
  endTime: number
  counting: boolean
  remain: number
  current(): CurrentTime
  start: () => void
  pause: () => void
  reset: (totalTime?: number) => void
  tick(): void
  render(): void
}

type CreateCountdownBar = (
  opts: CountdownBarOptions,
) => CountdownBarInstance

declare const createCountdownBar: CreateCountdownBar

export { CountdownBarInstance, CountdownBarOptions, CreateCountdownBar, CurrentTime, createCountdownBar };
