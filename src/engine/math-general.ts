import { Matrix } from './matrix'
import { Tuple, Point, Vector, Color } from './tuples'


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
 * Compare two floating point numbers or tuples for equivalence.
 */
export function equal (a: number, b: number): boolean
export function equal (t1: Tuple, t2: Tuple): boolean
export function equal (m1: Matrix, m2: Matrix): boolean
export function equal (a: number | Tuple | Matrix, b: number | Tuple | Matrix): boolean {

  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < Number.EPSILON
  }

  if (a instanceof Tuple && b instanceof Tuple) {
    return equal(a._tuple[0], b._tuple[0])
      && equal(a._tuple[1], b._tuple[1])
      && equal(a._tuple[2], b._tuple[2])
      && equal(a._tuple[3], b._tuple[3])
  }

  if (a instanceof Matrix && b instanceof Matrix) {
    return a.data.every((value, index) => equal(value, b.data[index]))
  }

  throw new Error(`Types of a & b must both be numbers, tuples, or matrices.`)
}

/** Returns true if the number is even. */
export const isEven = (n: number) => n % 2 === 0

/** Returns true if the number is odd. */
export const isOdd = (n: number) => n % 2 !== 0

/**
 * Multiplies tuples or matrices by other tuples, matrices or scalars.
 */
export function multiply (v1: Vector, v2: Vector): Vector
export function multiply (v: Vector, scalar: number): Vector
export function multiply (c1: Color, c2: Color): Color
export function multiply (c: Color, scalar: number): Color
export function multiply (m1: Matrix, m2: Matrix): Matrix
export function multiply (m: Matrix, scalar: number): Matrix
export function multiply (m: Matrix, p: Point): Point
export function multiply (m: Matrix, v: Vector): Vector
export function multiply (a: Tuple | Matrix, b: number | Tuple | Matrix): Tuple | Matrix {

  if (a instanceof Matrix && typeof b === 'number') {
    return new Matrix(a.data.map(value => value * b))
  }

  // Muliplication is only implemented for 4×4 matrices.
  if (a instanceof Matrix && b instanceof Matrix) {

    const m = new Matrix()

    for (let row = 0; row <= 3; row++) {
      for (let col = 0; col <= 3; col++) {

        const result
          = a.getValueAt(row, 0) * b.getValueAt(0, col)
          + a.getValueAt(row, 1) * b.getValueAt(1, col)
          + a.getValueAt(row, 2) * b.getValueAt(2, col)
          + a.getValueAt(row, 3) * b.getValueAt(3, col)

        m.setValueAt(row, col, result)
      }
    }

    return m
  }

  if (a instanceof Matrix && b instanceof Point) {

    const p = new Point(0, 0, 0)

    for (let row = 0; row <= 3; row++) {

      p._tuple[row]
        = a.getValueAt(row, 0) * b._tuple[0]
        + a.getValueAt(row, 1) * b._tuple[1]
        + a.getValueAt(row, 2) * b._tuple[2]
        + a.getValueAt(row, 3) * b._tuple[3]
    }

    return p
  }

   if (a instanceof Matrix && b instanceof Vector) {

    const v = new Vector(0, 0, 0)

    for (let row = 0; row <= 3; row++) {

      v._tuple[row]
        = a.getValueAt(row, 0) * b._tuple[0]
        + a.getValueAt(row, 1) * b._tuple[1]
        + a.getValueAt(row, 2) * b._tuple[2]
        + a.getValueAt(row, 3) * b._tuple[3]
    }

    return v
  }

  let t0: number = 0, t1: number = 0, t2: number = 0, t3: number = 0

  if (a instanceof Tuple && typeof b === 'number') {
    t0 = a._tuple[0] * b
    t1 = a._tuple[1] * b
    t2 = a._tuple[2] * b
    t3 = a._tuple[3] * b
  }

  if (a instanceof Tuple && b instanceof Tuple) {
    t0 = a._tuple[0] * b._tuple[0]
    t1 = a._tuple[1] * b._tuple[1]
    t2 = a._tuple[2] * b._tuple[2]
    t3 = a._tuple[3] * b._tuple[3]
  }

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

export const π = Math.PI
