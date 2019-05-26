import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to'
import { equal } from '@/math-tuples'

// Set up custom matchers
function toFloatingEqual (received: number, comparison: number) {

  const pass = equal(received, comparison)

  const message = pass
    ? () => `expected float ${received} not to equal float ${comparison}`
    : () => `expected float ${received} to equal float ${comparison}`

  return { message, pass }
}


expect.extend({
  toBeDeepCloseTo,
  toFloatingEqual
})


// Mock the ImageData constructor
declare global {
  namespace NodeJS {
    interface Global {
        ImageData: Function
    }
  }
}

global.ImageData = function (data: Uint8ClampedArray, width: number, height: number) {
  return { data, width, height }
}
