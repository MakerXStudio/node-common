import { retry } from './retry'
import { describe, it, expect } from 'vitest'

describe('retry', () => {
  it('retries the number of times specified', async () => {
    let retries = 0
    let failed = false
    try {
      await retry({
        attempts: 2,
        fn: async () => {
          retries++
          throw new Error('error')
        },
      })
    } catch {
      failed = true
    }

    expect(failed).toBe(true)
    expect(retries).toBe(2)
  })

  it('returns a value', async () => {
    let throwError = true
    const result = await retry({
      attempts: 10,
      fn: async () => {
        if (throwError) {
          throwError = false
          throw new Error('error')
        }
        return 'hello'
      },
    })

    expect(result).toBe('hello')
  })

  it('waits for the specified delay', async () => {
    const start = performance.now()
    const delay = 50
    let throwError = true
    await retry({
      attempts: 2,
      retryDelayMs: delay,
      fn: async () => {
        if (throwError) {
          throwError = false
          throw new Error('error')
        }
        return 1
      },
    })
    const durationMs = performance.now() - start

    expect(durationMs).toBeGreaterThanOrEqual(delay)
    expect(durationMs).toBeLessThanOrEqual(delay * 1.5)
  })
})
