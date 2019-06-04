import { Tuple } from '@/engine/tuples'


/**
 * Maps a value from the 0-1 range to 0-255 and rounds it to an integer.
 *
 * Values outside of 0-1 will return 0 or 255 respectively.
 */
export function clamp (value: number) {

  if (value < 0) value = 0
  if (value > 1) value = 1

  return Math.round(value * 255)
}

/**
 * Compare two floating point numbers or tuples for equivalence.
 */
export function equal (a: number, b: number): boolean
export function equal (a: Tuple, b: Tuple): boolean
export function equal (a: number | Tuple, b: number | Tuple): boolean {

  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < Number.EPSILON
  }

  if (a instanceof Tuple && b instanceof Tuple) {
    return equal(a._tuple[0], b._tuple[0])
      && equal(a._tuple[1], b._tuple[1])
      && equal(a._tuple[2], b._tuple[2])
      && equal(a._tuple[3], b._tuple[3])
  }

  throw new Error(`Types of a & b must be both numbers or both tuples.`)
}
