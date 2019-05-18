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
 * Returns the cross product of two vectors.
 *
 * The cross product returns the vector perpendicular to both v1 and v2.
 *
 * Note that order matters: changing the order of operands changes the sign of
 * the resulting vector.
 */
export function cross (v1: Vector, v2: Vector): Vector {

  return new Vector(
    (v1.y * v2.z) - (v1.z * v2.y),
    (v1.z * v2.x) - (v1.x * v2.z),
    (v1.x * v2.y) - (v1.y * v2.x)
  )
}

/**
 * Divide a vector by a scalar constant.
 */
export function divide (v: Vector, scalar: number) {

  if ((v.x === 0 || v.y === 0 || v.z === 0) && scalar === 0) throw new Error(`Dividing 0/0 isn't allowed.`)

  return new Vector(
    v.x / scalar,
    v.y / scalar,
    v.z / scalar
  )
}

/**
 * Returns the dot product of two vectors.
 *
 * The dot product describes the "force" of the vectors' shared direction.
 *
 * It increases as the angle between the vectors decreases (because they "share
 * more direction" that way).
 *
 * It also increases as the magnitude of the vectors increases (because they
 * have "more strength" to begin with that way).
 */
export function dot (v1: Vector, v2: Vector): number {

  return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z)
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
 * Returns the end-to-end length of the given vector.
 */
export function magnitude (v: Vector): number {

  return Math.sqrt(
    (v.x ** 2) + (v.y ** 2) + (v.z ** 2)
  )
}

/**
 * Multiply a vector by a scalar constant.
 */
export function multiply (v: Vector, scalar: number): Vector {

  return new Vector(
    v.x * scalar,
    v.y * scalar,
    v.z * scalar
  )
}

/**
 * Converts the given vector into a unit vector (i.e., magnitude = 1).
 */
export function normalize (v: Vector): Vector {

  const mag = magnitude(v)

  if (mag === 0) throw new Error(`Can't normalize a vector with 0 magnitude.`)

  return new Vector(
    v.x / mag,
    v.y / mag,
    v.z / mag
  )
}

/**
 * Returns the opposite of a vector.
 *
 * In other words, if a vector points from `a` to `b` then its opposite vector
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
 *   to a.
 * - When subtracting a vector from a point, it's like moving backwards
 *   across the vector to the "initial" point.
 * - When subtracting two vectors, the result is the change in direction
 *   between the two.
 */
export function subtract (a: Tuple, b: Tuple): Tuple {

  return new Tuple(
    a.x - b.x,
    a.y - b.y,
    a.z - b.z,
    a.w - b.w as ExactlyOneOrZero
  )
}
