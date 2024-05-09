interface RetryOptions<T> {
  attempts: number
  retryDelayMs?: number
  fn: () => Promise<T>
}

export async function retry<T>({ attempts, retryDelayMs = 0, fn }: RetryOptions<T>): Promise<T> {
  for (let i = attempts - 1; i >= 0; i--) {
    try {
      return await fn()
    } catch (e) {
      if (i === 0) {
        throw e
      }
      if (retryDelayMs) await new Promise((resolve) => setTimeout(resolve, retryDelayMs))
    }
  }
  throw new Error('retry managed to execute unreachable code')
}
