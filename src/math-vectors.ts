import { Vector } from '@/tuples'


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
 * Returns the end-to-end length of the given vector.
 */
export function magnitude (v: Vector): number {

  return Math.sqrt(
    (v.x ** 2) + (v.y ** 2) + (v.z ** 2)
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
