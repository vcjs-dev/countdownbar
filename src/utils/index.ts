export const formatLibName = (source: string, libName = 'countdownbar') =>
  source
    .replace('@/lib/main', libName)
    .replace('@/lib/interfaces/core', libName)
