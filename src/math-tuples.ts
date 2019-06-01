import { Tuple, Point, Vector, Color } from '@/tuples'


/**
 * Add two tuples together.
 *
 * - When adding a point to a vector, we get a transformed point (w = 1).
 * - When adding two vectors, we end up with a transformed vector (w = 0).
 */
export function add (a: Point, b: Point): Point
export function add (a: Point, b: Vector): Point
export function add (a: Vector, b: Point): Point
export function add (a: Vector, b: Vector): Vector
export function add (a: Color, b: Color): Color
export function add (a: Tuple, b: Tuple): Tuple {

  const t0 = a._tuple[0] + b._tuple[0]
  const t1 = a._tuple[1] + b._tuple[1]
  const t2 = a._tuple[2] + b._tuple[2]
  const t3 = a._tuple[3] + b._tuple[3]

  if (a instanceof Point && b instanceof Point) return new Point(t0, t1, t2)
  if (a instanceof Point && b instanceof Vector) return new Point(t0, t1, t2)
  if (a instanceof Vector && b instanceof Point) return new Point(t0, t1, t2)
  if (a instanceof Vector && b instanceof Vector) return new Vector(t0, t1, t2)
  if (a instanceof Color && b instanceof Color) return new Color(t0, t1, t2, t3)

  return new Tuple(t0, t1, t2, t3)
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
export function multiply (v1: Vector, v2: Vector): Vector
export function multiply (c1: Color, c2: Color): Color
export function multiply (v: Vector, scalar: number): Vector
export function multiply (c: Color, scalar: number): Color
export function multiply (a: Tuple, b: number | Tuple): Tuple {

  const t0 = (typeof b === 'number')
    ? a._tuple[0] * b
    : a._tuple[0] * b._tuple[0]

  const t1 = (typeof b === 'number')
    ? a._tuple[1] * b
    : a._tuple[1] * b._tuple[1]

  const t2 = (typeof b === 'number')
    ? a._tuple[2] * b
    : a._tuple[2] * b._tuple[2]

  const t3 = (typeof b === 'number')
    ? a._tuple[3] * b
    : a._tuple[3] * b._tuple[3]

  if (a instanceof Vector) return new Vector(t0, t1, t2)
  if (a instanceof Color) return new Color(t0, t1, t2, t3)

  return new Tuple(t0, t1, t2, t3)
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
