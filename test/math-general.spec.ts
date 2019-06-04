import { clamp, equal } from '@/engine/math-general'
import { Tuple } from '@/engine/tuples'


describe('clamp()', () => {

  it('should clamp 0 to 0', () => {

    expect(clamp(0)).toFloatingEqual(0)
  })

  it('should clamp 1 to 255', () => {

    expect(clamp(1)).toFloatingEqual(255)
  })

  it('should clamp 0.5 to 128', () => {

    expect(clamp(0.5)).toFloatingEqual(128) // round up from 127.5
  })

  it('should clamp -1 to 0', () => {

    expect(clamp(-1)).toFloatingEqual(0)
  })

  it('should clamp 300 to 255', () => {

    expect(clamp(300)).toFloatingEqual(255)
  })
})

describe('equal()', () => {

  it('should compare two floating point numbers', () => {

    expect(equal(1.0, 1.0)).toBe(true)
    expect(equal(1.0, 1.1)).toBe(false)
  })

  it('should compare two tuples', () => {

    const a = new Tuple(1.0, 2.5, -3.0, 1.0)
    const b = new Tuple(6.7, 2.5, 3.0, 0.0)

    expect(equal(a, a)).toBe(true)
    expect(equal(a, b)).toBe(false)
  })
})
