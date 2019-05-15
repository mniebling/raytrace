import { equal } from '@/math'


export type ExactlyOneOrZero = 0.0 | 1.0


export class Tuple {

  x: number
  y: number
  z: number
  w: ExactlyOneOrZero

  /**
   * Passing w = 1.0 creates a Point, 0.0 creates a Vector.
   */
  constructor(
    x: number,
    y: number,
    z: number,
    w: ExactlyOneOrZero
  ) {

    if (typeof x !== 'number') throw new Error(`x value must be provided`)
    if (typeof y !== 'number') throw new Error(`y value must be provided`)
    if (typeof z !== 'number') throw new Error(`z value must be provided`)
    if (typeof w !== 'number') throw new Error(`w value must be provided`)

    if (w !== 0.0 && w !== 1.0) throw new Error(`w must be 0.0 or 1.0`)

    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }
}

export class Point extends Tuple {

  constructor (
    x: number,
    y: number,
    z: number
  ) {

    super(x, y, z, 1.0)
  }
}

export class Vector extends Tuple {

  constructor (
    x: number,
    y: number,
    z: number
  ) {

    super(x, y, z, 0.0)
  }
}

export function isPoint (tuple: Tuple): tuple is Point {

  return equal(tuple.w, 1.0)
}

export function isVector (tuple: Tuple): tuple is Vector {

  return equal(tuple.w, 0.0)
}
