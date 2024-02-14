import { AccessTokenResponse } from './authorization'
import { describe, it, expect } from 'vitest'

describe('AccessTokenResponse', () => {
  it('correctly sets expiry', () => {
    const response = new AccessTokenResponse({ access_token: 'access_token', expires_in: 100 })
    expect(response.expires.getTime() / 1000).toBeCloseTo(new Date(Date.now() + 100 * 1000).getTime() / 1000, 0)
  })

  it('correctly evaluates expiry within seconds', () => {
    const response = new AccessTokenResponse({ access_token: 'access_token', expires_in: 100 })
    expect(response.willExpire(100)).toBe(true)
    expect(response.willExpire(101)).toBe(true)
    expect(response.willExpire(99)).toBe(false)
    expect(response.willExpire(1)).toBe(false)
  })
})
