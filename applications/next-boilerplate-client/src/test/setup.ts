import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

import '@testing-library/jest-dom'

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = vi.fn()

// Cleanup after each test
afterEach(() => {
  cleanup()
})
