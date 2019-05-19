import { Tuple } from '@/tuples'


/**
 * Add two tuples together.
 *
 * - When adding a point to a vector, we get a transformed point (w = 1).
 * - When adding two vectors, we end up with a transformed vector (w = 0).
 */
export function add (a: Tuple, b: Tuple): Tuple {

  return new Tuple(
    a._tuple[0] + b._tuple[0],
    a._tuple[1] + b._tuple[1],
    a._tuple[2] + b._tuple[2],
    a._tuple[3] + b._tuple[3]
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
    return equal(a._tuple[0], b._tuple[0])
      && equal(a._tuple[1], b._tuple[1])
      && equal(a._tuple[2], b._tuple[2])
      && equal(a._tuple[3], b._tuple[3])
  }

  throw new Error(`Types of a & b must be both numbers or both tuples.`)
}


/**
 * Divide a tuple by a scalar constant.
 */
export function divide (t: Tuple, scalar: number) {

  if (t._tuple.includes(0) && scalar === 0) throw new Error(`Dividing 0/0 isn't allowed.`)

  return new Tuple(
    t._tuple[0] / scalar,
    t._tuple[1] / scalar,
    t._tuple[2] / scalar,
    t._tuple[3] / scalar
  )
}

/**
 * Multiply a tuple by a scalar constant or another tuple.
 */
export function multiply (t1: Tuple, t2: Tuple): Tuple
export function multiply (t: Tuple, scalar: number): Tuple
export function multiply (a: Tuple, b: number | Tuple): Tuple {

  if (typeof b === 'number') {
    return new Tuple(
      a._tuple[0] * b,
      a._tuple[1] * b,
      a._tuple[2] * b,
      a._tuple[3] * b
    )
  }

  return new Tuple(
    a._tuple[0] * b._tuple[0],
    a._tuple[1] * b._tuple[1],
    a._tuple[2] * b._tuple[2],
    a._tuple[3] * b._tuple[3],
  )
}

/**
 * Subtract tuple `b` from tuple `a`.
 *
 * - When subtracting two points, the result is the vector which spans from b
 *   to a.
 * - When subtracting a vector from a point, it's like moving backwards
 *   across the vector to the "initial" point.
 * - When subtracting two vectors, the result is the change in direction
 *   between the two.
 */
export function subtract (a: Tuple, b: Tuple): Tuple {

  return new Tuple(
    a._tuple[0] - b._tuple[0],
    a._tuple[1] - b._tuple[1],
    a._tuple[2] - b._tuple[2],
    a._tuple[3] - b._tuple[3]
  )
}
