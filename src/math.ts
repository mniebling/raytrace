import { Tuple, isPoint, isVector } from '@/tuples'


/**
 * Add two tuples together.
 *
 * - When adding a point to a vector, we get a transformed point (w = 1).
 * - When adding two vectors, we end up with a transformed vector (w = 0).
 */
export function add (a: Tuple, b: Tuple): Tuple {

  if (isPoint(a) && isPoint(b)) throw new Error(`Adding two points doesn't make sense!`)

  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,

    // We can't simply sum the `w` values because TS isn't sure they'll
    // remain ExactlyOneOrZero.
    w: isVector(a) && isVector(b) ? 0.0 : 1.0
  }
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
    return equal(a.x, b.x)
      && equal(a.y, b.y)
      && equal(a.z, b.z)
      && equal(a.w, b.w)
  }

  throw new Error(`Types of a & b must be both numbers or both Tuples.`)
}
