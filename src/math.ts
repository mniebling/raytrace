import { Tuple, isPoint, isVector, ExactlyOneOrZero, Vector } from '@/tuples'


/**
 * Add two tuples together.
 *
 * - When adding a point to a vector, we get a transformed point (w = 1).
 * - When adding two vectors, we end up with a transformed vector (w = 0).
 */
export function add (a: Tuple, b: Tuple): Tuple {

  if (isPoint(a) && isPoint(b)) throw new Error(`Adding two points doesn't make sense!`)

  return new Tuple(
    a.x + b.x,
    a.y + b.y,
    a.z + b.z,

    // We can't simply sum the `w` values because TS isn't sure they'll
    // remain ExactlyOneOrZero. I wonder if this is a better approach than
    // simply doing the addition and then casting the result?
    isVector(a) && isVector(b) ? 0.0 : 1.0
  )
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

/**
 * Returns the opposite of a vector.
 *
 * In other words, if the vector points from `a` to `b` then the opposite vector
 * points from `b` to `a`.
 */
export function negate (v: Vector): Vector {

  return new Vector(
    0 - v.x,
    0 - v.y,
    0 - v.z
  )
}

/**
 * Subtract tuple `b` from tuple `a`.
 *
 * - When subtracting two points, the result is the vector which spans from b
 * to a.
 * - When subtracting a vector from a point, it's like moving backwards
 * across the vector to the "initial" point.
 * - When subtracting two vectors, the result is the change in direction
 * between the two.
 */
export function subtract (a: Tuple, b: Tuple): Tuple {

  return new Tuple(
    a.x - b.x,
    a.y - b.y,
    a.z - b.z,
    a.w - b.w as ExactlyOneOrZero
  )
}
